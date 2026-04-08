import { pgTable, serial, integer, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./auth-schema";

// ================== PRODUCT ==================
export const product = pgTable("product", {
    id: serial("id").primaryKey(),

    productId: integer("product_id").unique().notNull(),
    name: text("name").notNull(),
    description: text("description"),

    // Prisma String[] → Postgres text[]
    media: text("media").array(),

});

// ================== VARIANT ==================
export const variant = pgTable("variant", {
    id: serial("id").primaryKey(),

    variantId: integer("variant_id").unique().notNull(),
    name: text("name").notNull(),
    description: text("description"),

    price: text("price").notNull(),
    isUsageBased: boolean("is_usage_based").default(false),

    interval: text("interval"),
    intervalCount: integer("interval_count"),

    trialInterval: text("trial_interval"),
    trialIntervalCount: integer("trial_interval_count"),

    sort: integer("sort"),

    productId: integer("product_id")
        .notNull()
        .references(() => product.id),
});

// ================== PURCHASE ==================
export const purchase = pgTable("purchase", {
    id: serial("id").primaryKey(),

    variantId: integer("variant_id")
        .notNull()
        .references(() => variant.id),

    tokensGranted: integer("tokens_granted").notNull(),

    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),

    createdAt: timestamp("created_at").defaultNow(),
});

// ================== RELATIONS ==================
export const productRelations = relations(product, ({ many }) => ({
    variants: many(variant),
}));

export const variantRelations = relations(variant, ({ one, many }) => ({
    product: one(product, {
        fields: [variant.productId],
        references: [product.id],
    }),
    purchases: many(purchase),
}));

export const purchaseRelations = relations(purchase, ({ one }) => ({
    variant: one(variant, {
        fields: [purchase.variantId],
        references: [variant.id],
    }),
    user: one(user, {
        fields: [purchase.userId],
        references: [user.id],
    }),
}));