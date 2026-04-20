/* src/app/actions.ts */
'use server'

import { configureLemonSqueezy } from '@/lib/lemonsqueezy'
import { redirect } from "next/navigation";

import {
    createCheckout,
    getProduct,
    listPrices,
    listProducts,
    Variant,
} from '@lemonsqueezy/lemonsqueezy.js'

import { db } from '@/db'
import { product, variant } from '@/db/schema/payment-schema'
import { user } from '@/db/schema/auth-schema'
import { eq } from 'drizzle-orm'
import { getCurrentUser } from '@/lib/getUser'

// =======================
// SYNC PLANS
// =======================
export async function syncPlans() {
    configureLemonSqueezy()

    const productsRes = await listProducts({
        filter: { storeId: process.env.LEMON_SQUEEZY_STORE_ID },
        include: ['variants'],
    })

    const allVariants = productsRes.data?.included as Variant['data'][] | undefined
    if (!allVariants) return []


    for (const v of allVariants) {
        const variantData = v.attributes

        // ❌ skip drafts
        if (variantData.status === 'draft') continue

        // =======================
        // GET PRODUCT
        // =======================
        const productRes = await getProduct(variantData.product_id)

        const productName =
            productRes.data?.data.attributes.name ?? ''

        const productDescription =
            productRes.data?.data.attributes.description ?? ''

        // =======================
        // UPSERT PRODUCT (Drizzle way)
        // =======================
        const insertedProduct = await db
            .insert(product)
            .values({
                productId: variantData.product_id,
                name: productName,
                description: productDescription,
            })
            .onConflictDoUpdate({
                target: product.productId,
                set: {
                    name: productName,
                    description: productDescription,
                },
            })
            .returning()

        const productRow = insertedProduct[0]

        // =======================
        // PRICE INFO
        // =======================
        const variantPriceObject = await listPrices({
            filter: { variantId: v.id },
        })

        const currentPriceObj =
            variantPriceObject.data?.data.at(0)

        const isUsageBased =
            currentPriceObj?.attributes.usage_aggregation !== null

        const interval =
            currentPriceObj?.attributes.renewal_interval_unit ?? null

        const intervalCount =
            currentPriceObj?.attributes.renewal_interval_quantity ?? null

        const trialInterval =
            currentPriceObj?.attributes.trial_interval_unit ?? null

        const trialIntervalCount =
            currentPriceObj?.attributes.trial_interval_quantity ?? null

        const price = isUsageBased
            ? currentPriceObj?.attributes.unit_price_decimal
            : currentPriceObj?.attributes.unit_price

        const priceString = price ? price.toString() : '0'

        // =======================
        // UPSERT VARIANT
        // =======================
        await db
            .insert(variant)
            .values({
                variantId: parseInt(v.id),
                name: variantData.name || productName,
                description:
                    variantData.description || productDescription,
                price: priceString,
                interval,
                intervalCount,
                isUsageBased,
                trialInterval,
                trialIntervalCount,
                sort: variantData.sort,
                productId: productRow.id,
            })
            .onConflictDoUpdate({
                target: variant.variantId,
                set: {
                    name: variantData.name || productName,
                    description:
                        variantData.description || productDescription,
                    price: priceString,
                    interval,
                    intervalCount,
                    isUsageBased,
                    trialInterval,
                    trialIntervalCount,
                    sort: variantData.sort,
                    productId: productRow.id,
                },
            })
    }

    // =======================
    // FETCH WITH JOIN
    // =======================
    const variantsWithProduct = await db
        .select({
            id: variant.id,
            variantId: variant.variantId,
            name: variant.name,
            description: variant.description,
            price: variant.price,
            productId: variant.productId,
            productName: product.name,
        })
        .from(variant)
        .leftJoin(product, eq(variant.productId, product.id))


    return variantsWithProduct
}

// =======================
// CHECKOUT URL
// =======================
export async function getCheckoutURL(
    variantId: number,
    embed = false
) {
    configureLemonSqueezy()

    const session = await getCurrentUser();

    if (!session) {
        redirect("/auth/sign-in");
       
    }

    if (!user) throw new Error("Not logged in");

    const email = session?.email

    // ✅ Prisma → Drizzle findUnique
    const userData = await db
        .select()
        .from(user)
        .where(eq(user.email, email!))
        .limit(1)

    const dbUser = userData[0]

    const checkout = await createCheckout(
        process.env.LEMON_SQUEEZY_STORE_ID!,
        variantId,
        {
            checkoutOptions: {
                embed,
                media: false,
                logo: !embed,
            },
            checkoutData: {
                email: email ?? undefined,
                custom: {
                    user_id: dbUser?.id,
                },
            },
            productOptions: {
                enabledVariants: [variantId],
                redirectUrl: `https://www.loveedit.art/gallery`,
                receiptButtonText: 'Go to Dashboard',
                receiptThankYouNote:
                    'Thank you for signing up to Lemon Stand!',
            },
        }
    )


    return checkout.data?.data?.attributes?.url
}