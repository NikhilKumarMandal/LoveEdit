export type PLAN = {
    id: string;
    title: string;
    tokens: number;
    price: number;
    originalPrice?: number;
    badge?: string;
    isLimitedTimeOffer?: boolean;
    buttonText: string;
    features: string[];
};



const featuresX: string[] = [
    "Smart Editing",
    "Generative Fill",
    "Remove bg image",
    "Upscale Image",
    "AI Image Generation",
    "Remix Image"
]

const featuresY: string[] = [
    "Smart Editing",
    "Generative Fill",
    "Remove bg image",
    "Upscale Image",
    "AI Image Generation",
    "Remix Image",
    "Priority support",
]

const featuresZ: string[] = [
    "Smart Editing",
    "Generative Fill",
    "Remove bg image",
    "Upscale Image",
    "AI Image Generation",
    "Remix Image",
    "Priority support"
]



// Convert token usage to an array of strings
// const usageFeatures = Object.entries(TOKEN_USAGE).map(
//   ([service, usage]) => `${service}: ${usage}`
// );

// Plans array with shared features
export const PLANS: PLAN[] = [
    {
        id: "silver",
        title: "Silver",
        tokens: 1500,
        price: 19,
        originalPrice: 30,
        isLimitedTimeOffer: true,
        buttonText: "Continue with Silver",
        features: featuresX,
    },
    {
        id: "gold",
        title: "Gold",
        tokens: 3500,
        price: 39,
        originalPrice: 62,
        badge: "Most Popular",
        isLimitedTimeOffer: true,
        buttonText: "Continue with Gold",
        features: featuresY,
    },
    {
        id: "platinum",
        title: "Platinum",
        tokens: 7000,
        price: 69,
        originalPrice: 110,
        isLimitedTimeOffer: true,
        buttonText: "Continue with Platinum",
        features: featuresZ,
    },
];