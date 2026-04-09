CREATE TABLE "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"media" text[],
	CONSTRAINT "product_product_id_unique" UNIQUE("product_id")
);
--> statement-breakpoint
CREATE TABLE "purchase" (
	"id" serial PRIMARY KEY NOT NULL,
	"variant_id" integer NOT NULL,
	"tokens_granted" integer NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "variant" (
	"id" serial PRIMARY KEY NOT NULL,
	"variant_id" integer NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" text NOT NULL,
	"is_usage_based" boolean DEFAULT false,
	"interval" text,
	"interval_count" integer,
	"trial_interval" text,
	"trial_interval_count" integer,
	"sort" integer,
	"product_id" integer NOT NULL,
	CONSTRAINT "variant_variant_id_unique" UNIQUE("variant_id")
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "credits" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_variant_id_variant_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."variant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variant" ADD CONSTRAINT "variant_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;