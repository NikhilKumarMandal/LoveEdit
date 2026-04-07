import { pgTable, text, timestamp, integer, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { relations } from "drizzle-orm";

export const images = pgTable("images", {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: text("user_id").notNull(),

    // ImageKit data
    url: text("url").notNull(),          
    fileId: text("file_id").notNull(),   
    fileName: text("file_name").notNull(),

    // Optional but useful for the editor canvas
    width: integer("width"),
    height: integer("height"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const imageRelations = relations(images, ({ one }) => ({
    user: one(user, {
        fields: [images.userId],
        references: [user.id],
    }),
}));