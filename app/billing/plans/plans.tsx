/* src/components/dashboard/billing/plans/plans.tsx */

import { syncPlans } from "@/app/actions/actions";
import { Plan } from "./plan";
import { db } from "@/db";
import { variant, product } from "@/db/schema/payment-schema";
import { eq, sql } from "drizzle-orm";
import { NewPlan } from "@/types";






export async function Plans() {
    // =========================
    // FETCH PLANS (JOIN)
    // =========================
    let allPlans: NewPlan[] = await db
        .select({
            // variant fields
            id: variant.id,
            variantId: variant.variantId,
            name: variant.name,
            description: variant.description,
            price: variant.price,
            isUsageBased: sql<boolean>`coalesce(${variant.isUsageBased}, false)`,
            interval: variant.interval,
            intervalCount: variant.intervalCount,
            trialInterval: variant.trialInterval,
            trialIntervalCount: variant.trialIntervalCount,
            sort: variant.sort,
            productId: variant.productId,

            // joined field
            productName: sql<string>`coalesce(${product.name}, '')`,
        })
        .from(variant)
        .leftJoin(product, eq(variant.productId, product.id));

    console.log("all plans", allPlans);

    // =========================
    // SYNC IF EMPTY
    // =========================
    if (!allPlans.length) {
        await syncPlans();

        allPlans = await db
            .select({
                id: variant.id,
                variantId: variant.variantId,
                name: variant.name,
                description: variant.description,
                price: variant.price,
                isUsageBased: sql<boolean>`coalesce(${variant.isUsageBased}, false)`,
                interval: variant.interval,
                intervalCount: variant.intervalCount,
                trialInterval: variant.trialInterval,
                trialIntervalCount: variant.trialIntervalCount,
                sort: variant.sort,
                productId: variant.productId,
                productName: sql<string>`coalesce(${product.name}, '')`,
            })
            .from(variant)
            .leftJoin(product, eq(variant.productId, product.id));
    }

    // =========================
    // FILTER PLANS
    // =========================
    const filteredPlans = allPlans.filter((plan) =>
        /gold|silver|platinum/i.test(plan.name)
    );

    if (!filteredPlans.length) {
        return <p>No plans available.</p>;
    }

    return (
        <div className="max-w-6xl mx-auto px-8 sm:px-16 py-10 h-[calc(100vh-33px)] mt-10">
            <div className="mb-5 mt-3 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">
                {filteredPlans.map((plan, index) => (
                    <Plan key={`plan-${index}`} serverPlan={plan} />
                ))}
            </div>
        </div>
    );
}