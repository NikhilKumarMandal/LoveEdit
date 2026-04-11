import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function handleInsufficientCredits() {
  toast.error("You don't have enough credits", {
    description: "Purchase credits to continue editing.",
    action: {
      label: "Buy Credits",
      onClick: () => (window.location.href = "/billing"),
    },
    duration: 6000,
  });
};


export async function checkResponse(response: Response): Promise<any> {
  if (response.status === 402) {
    handleInsufficientCredits();
    return null; // signal to caller to bail out
  }

  if (!response.ok) {
    toast.error("Something went wrong", {
      description: "Please try again.",
    });
    return null;
  }

  return response.json();
}