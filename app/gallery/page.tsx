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
        <section className="w-full relative flex flex-col pt-10 sm:pt-12 md:pt-16 px-4 sm:px-6 lg:px-10">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-2">
                    My Images
                </h1>

                <div className="self-start sm:self-auto">
                    <span className="text-xs sm:text-sm font-medium bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full border border-yellow-300">
                        ⚠️ Download within 2 days (auto delete)
                    </span>
                </div>

            </div>

            <GalleryComponent images={images} />

        </section>
    );
};

export default Gallery;