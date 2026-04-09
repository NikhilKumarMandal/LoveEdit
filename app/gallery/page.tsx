import { getImage } from '@/app/actions/image-actions';
import GalleryComponent from '@/components/gallery/GalleryComponent';
import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

const Gallery = async () => {
    // Call server action
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/auth/sign-in");
    }
    const response = await getImage();

    const images = response.success && response.data ? response.data : [];

    return (
        <section className="w-full relative flex flex-col pt-16">
            <h1 className="text-3xl font-semibold px-17">My Images</h1>
            <GalleryComponent images={images} />
        </section>
    );
};

export default Gallery;