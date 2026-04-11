import crypto from "crypto";
import { NextRequest } from "next/server";
import { db } from "@/db";
import { user } from "@/db/schema/auth-schema";
import { eq, sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();

        const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!;
        const hmac = crypto.createHmac("sha256", secret);
        const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "hex");
        const signature = Buffer.from(
            req.headers.get("x-signature") || "",
            "hex"
        );

        if (!crypto.timingSafeEqual(digest, signature)) {
            return Response.json({ message: "Invalid signature" }, { status: 400 });
        }

        const body = JSON.parse(rawBody);
        const eventType = req.headers.get("x-event-name");

        // ===============================
        // HANDLE ORDER CREATED
        // ===============================
        if (eventType === "order_created") {
            const userId = body.meta?.custom_data?.user_id;
            const isSuccessful = body.data?.attributes?.status === "paid";

            if (userId && isSuccessful) {
                const plan =
                    body.data.attributes.first_order_item.variant_name;

                let credits = 0;
                if (plan === "Silver") credits = 1500;
                if (plan === "Gold") credits = 3500;
                if (plan === "Platinum") credits = 7000;

                if (credits > 0) {
                    await db
                        .update(user)
                        .set({
                            credits: sql`${user.credits} + ${credits}`,
                        })
                        .where(eq(user.id, userId));
                }
            }
        }

        return Response.json({ message: "Webhook received" });
    } catch (err) {
        console.error("Webhook error:", err);
        return Response.json({ message: "Server error" }, { status: 500 });
    }
}