import { InferSelectModel } from "drizzle-orm";
import { variant } from "@/db/schema/payment-schema";

type VariantType = InferSelectModel<typeof variant>;

export type NewPlan = Omit<VariantType, "isUsageBased"> & {
  isUsageBased: boolean; 
  productName: string;
};

export type Point = {
  x: number;
  y: number;
};
