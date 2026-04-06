import { pgTable, text, timestamp, index } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { relations } from "drizzle-orm";

export const image = pgTable(
    "image",
    {
        id: text("id").primaryKey(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        url: text("url").notNull(),
        fileId: text("file_id").notNull(),
        fileName: text("file_name"),
        createdAt: timestamp("created_at")
            .defaultNow()
            .notNull(),
    },
    (table) => [
        index("image_userId_idx").on(table.userId),
    ]
);

export const imageRelations = relations(image, ({ one }) => ({
    user: one(user, {
        fields: [image.userId],
        references: [user.id],
    }),
}));