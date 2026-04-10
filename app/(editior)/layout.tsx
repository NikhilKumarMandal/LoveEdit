import { auth } from '@/lib/auth';
import React from 'react'
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function EditiorLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/auth/sign-in");
    }

    return (
        <>
            {children}
        </>
    )
}

