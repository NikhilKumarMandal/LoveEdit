"use client";

import React, { useId } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { deleteImage } from "@/app/actions/image-actions";

interface DeleteImageProps {
    imageId: string;
    fileId: string; // optional if you want to delete from storage
    onDelete?: () => void; // callback to refresh gallery
    className?: string;
}

const DeleteImage: React.FC<DeleteImageProps> = ({
    imageId,
    fileId,
    onDelete,
    className,
}) => {
    const toastId = useId();

    const handleDelete = async () => {
        toast.loading("Deleting the image...", { id: toastId });

        try {
            // Call server action
            const { success, error } = await deleteImage(imageId, fileId);

            if (error) {
                toast.error(error, { id: toastId });
            } else if (success) {
                toast.success("Image deleted successfully", { id: toastId });
                onDelete?.(); // callback to parent (e.g., refresh gallery)
            } else {
                toast.dismiss(toastId);
            }
        } catch (err) {
            console.error("Delete failed:", err);
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className={cn("w-fit", className)}>
                    <Trash2 className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the image.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive hover:bg-destructive/90"
                        onClick={handleDelete}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteImage;