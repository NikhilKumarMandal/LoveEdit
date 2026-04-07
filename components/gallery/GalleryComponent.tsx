"use client";
import { useState } from "react";
import ImageDialog, { Image } from "./ImageDialog";

interface GalleryProps {
    images: Image[];
}

function GalleryComponent({ images }: GalleryProps) {
    const [selectedImage, setSelectImage] = useState<Image | null>(null);

    if (images.length === 0) {
        return (
            <div className="flex items-center justify-center h-[50vh] text-muted-foreground">
                No Images found!
            </div>
        );
    }

    return (
        <section className="container mx-auto py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div key={index}>
                        <div
                            className="relative overflow-hidden cursor-pointer rounded-lg group"
                            onClick={() => setSelectImage(image)}
                        >
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-70 flex items-center justify-center rounded-lg">
                                <p className="text-primary-foreground text-lg font-semibold">
                                    View Details
                                </p>
                            </div>

                            {/* Image with fixed aspect ratio */}
                            <div className="w-full aspect-square">
                                <img
                                    src={image.url!}
                                    alt={image.url}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <ImageDialog
                    image={selectedImage}
                    onClose={() => setSelectImage(null)}
                />
            )}
        </section>
    );
}

export default GalleryComponent;