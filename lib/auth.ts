import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import { schema } from "@/db/schema/auth-schema";


export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    basePath: "/api/auth",
    trustedOrigins: [
    "https://www.loveedit.art",
    "https://loveedit.art",
    "http://localhost:3000",
  ],
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema,
    }),

    socialProviders: {
        google: {
            accessType: "offline",
            prompt: "select_account consent",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env
                .GOOGLE_CLIENT_SECRET as string,
        },
    },
  
});