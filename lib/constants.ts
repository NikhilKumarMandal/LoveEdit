import {
  Crop,
  Film,
  Frame,
  Monitor,
  RectangleHorizontal,
  RectangleVertical,
  Smartphone,
  Square,
} from "lucide-react";

export const ratios = [
  // Square
  {
    label: "Square (1:1)",
    value: 1,
    aspectRatio: "1:1",
    icon: Square,
    desc: "Instagram Feed",
  },

  // Landscape / Wide
  {
    label: "Wide (16:9)",
    value: 16 / 9,
    aspectRatio: "16:9",
    icon: Monitor,
    desc: "YouTube / Video",
  },
  {
    label: "Standard (4:3)",
    value: 4 / 3,
    aspectRatio: "4:3",
    icon: RectangleHorizontal,
    desc: "Classic Camera",
  },
  {
    label: "Classic (3:2)",
    value: 3 / 2,
    aspectRatio: "3:2",
    icon: Frame,
    desc: "DSLR / Print",
  },
  {
    label: "Cinema (21:9)",
    value: 21 / 9,
    aspectRatio: "21:9",
    icon: Film,
    desc: "Ultrawide",
  },

  // Portrait / Tall
  {
    label: "Story (9:16)",
    value: 9 / 16,
    aspectRatio: "9:16",
    icon: Smartphone,
    desc: "TikTok / Reels",
  },
  {
    label: "Social (4:5)",
    value: 4 / 5,
    aspectRatio: "4:5",
    icon: Crop,
    desc: "Insta Portrait",
  },
  {
    label: "Poster (2:3)",
    value: 2 / 3,
    aspectRatio: "2:3",
    icon: RectangleVertical,
    desc: "Pinterest",
  },
];

export const filters = [
  {
    id: "cartoon",
    name: "Toonify",
    prompt:
      "Redraw the entire image as a vibrant 2D cartoon. Apply bold black outlines, flat coloring, and cel-shading globally to both the subject and the background. Simplify details into a clean comic book style.",
    image: "/filters/toonify.png",
  },
  {
    id: "ghibli",
    name: "Ghibli Studio",
    prompt:
      "Transform the whole image into a Studio Ghibli anime scene. Redraw everything with hand-painted backgrounds, vibrant natural greens and blues, fluffy clouds, and cel-shaded characters. Maintain the original composition but strictly enforce the Hayao Miyazaki art style.",
    image: "/filters/ghibli.png",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    prompt:
      "Apply a global Cyberpunk 2077 aesthetic. Shift the entire color palette to neon cyan, magenta, and deep black. Add a futuristic glow, rain reflections, and high-tech digital artifacts to the whole scene.",
    image: "/filters/cyberpunk.png",
  },
  {
    id: "oil_painting",
    name: "Oil Painting",
    prompt:
      "Re-imagine this image as a classic oil painting on canvas. Apply heavy, visible brushstrokes and rich impasto textures across the entire surface. Blend colors like an Impressionist master (Van Gogh style). Remove all photorealistic sharpness.",
    image: "/filters/oilpainting.png",
  },
  {
    id: "headsort",
    name: "Headsort",
    prompt: "A professional, high-resolution profile photo, maintaining the exact facial structure, identity, and key features of the person in the input image. The subject is framed from the chest up, with ample headroom. The person looks directly at the camera. They are styled for a professional photo studio shoot, wearing a premium smart casual blazer in a subtle charcoal gray. The background is a solid '#562226' neutral studio color. Shot from a high angle with bright and airy soft, diffused studio lighting, gently illuminating the face and creating a subtle catchlight in the eyes, conveying a sense of clarity. Captured on an 85mm f/1.8 lens with a shallow depth of field, exquisite focus on the eyes, and beautiful, soft bokeh. Observe crisp detail on the fabric texture of the blazer, individual strands of hair, and natural, realistic skin texture. The atmosphere exudes confidence, professionalism, and approachability. Clean and bright cinematic color grading with subtle warmth and balanced tones, ensuring a polished and contemporary feel.",
    image: "/filters/headshot.webp",
  },
  {
    id: "magazine_cover",
    name: "Magazine Cover",
    prompt: "Create a beautiful, photo book style magazine cover that fully utilizes the 9:16 aspect ratio. Place the attached person at the precise coordinates of [latitude/longitude coordinate], seamlessly blending them into the scene as if they are sightseeing. Approach this task with the understanding that this is a critical page that will significantly influence visitor numbers. NEGATIVE: coordinate texts",
    image: "/filters/magazine-cover.webp"
  },
  {
    id: "wide_angle_phone",
    name: "Wide Angle Phone",
    prompt: `{
  "edit_type": "extreme_wide_angle_phone_edit",
  "source": {
    "_hint": "Base for editing the person, clothing, and atmosphere of the original image. No new characters allowed.",
    "mode": "EDIT",
    "preserve_elements": ["Person", "Face", "Hairstyle", "Clothing", "Environment style"],
    "change_rules": {
      "camera_angle": "Ultra-wide or fisheye lens (equivalent to 12-18mm)",
      "angle_options": [
        "Looking up from directly in front",
        "Looking down from directly in front", 
        "Extreme low angle",
        "High angle",
        "Tilted composition"
      ],
      "perspective_effect": "Nearby objects are exaggerated, distant objects become smaller",
      "body_parts_close_to_camera": "Bring 1-3 body parts extremely close to the camera",
      "body_part_options": [
        "Hands",
        "Feet/shoes",
        "Knees/thighs",
        "Face",
        "Shoulders/chest"
      ],
      "pose_variety": [
        "Extending one hand/leg toward the camera",
        "Squatting or lying on stomach halfway",
        "Sitting on the ground or an object",
        "Lying on the ground with legs pointed at camera",
        "Leaning body sharply toward the camera",
        "Twisting body for dynamic pose"
      ]
    },
    "phone_handling": {
      "allowed": true,
      "grip_options": [
        "One-handed", 
        "Two-handed",
        "Low angle",
        "High angle", 
        "Tilted",
        "Sideways",
        "Close to chest",
        "Close to waist",
        "Casual grip"
      ],
      "screen_replacement": {
        "target": "Only the smartphone screen portion displayed in the image",
        "source": "Second reference image",
        "fitting_rules": "Strictly match the screen shape, no stretching or compression",
        "interface_rules": "No icons, status bars, or app borders; only display content from original image"
      }
    },
    "environment_consistency": {
      "location": "Maintain the same location as the original image",
      "lighting": "Maintain direction and intensity",
      "extension_rules": "Maintain the same buildings, walls, road markings, colors, materials, and lighting style"
    },
    "global_restrictions": [
      "No new characters allowed",
      "No changes to age or gender expression of person", 
      "No clothing changes",
      "No changes to location type",
      "No text, logos, or watermarks added to image",
      "No illustration or anime style"
    ]
  }
}`,
    image: "/filters/wide-angle.png"
  },
  {
    id: "fisheye_matcha_girl",
    name: "Fisheye Matcha Girl",
    prompt: `{
  "scene": {
    "environment": "sunny_boardwalk",
    "details": "wooden_planks, colorful_stalls, people_walking, distant_umbrellas",
    "lighting": "bright_midday_sun",
    "sky": "clear_blue"
  },
  "camera": {
    "lens": "ultra_wide_fisheye_12mm",
    "distance": "very_close_up",
    "distortion": "strong_exaggeration",
    "angle": "slightly_low_upward"
  },
  "subject": {
    "type": "young_person",
    "gender": "neutral",
    "expression": "curious_playful",
    "eyes": "large_due_to_lens_distortion",
    "pose": "leaning_forward_sipping_drink",
    "clothing": {
      "top": "bright_green_knit_sweater",
      "accessory": "chunky_blue_sunglasses"
    }
  },
  "drink": {
    "type": "iced_matcha_latte",
    "ice_cubes": "large_clear",
    "cup": "transparent_plastic",
    "straw": "green_white_spiral"
  },
  "effects": {
    "depth_of_field": "shallow_foreground_sharp_background_soft",
    "reflections": "glasses_show_boardwalk_and_people",
    "color_grade": "clean_natural"
  },
  "composition": {
    "focus": "face_extreme_closeup",
    "mood": "funny_intimate_casual",
    "background_elements": [
      "distant_people",
      "benches",
      "bright_shops"
    ]
  }
}`,
    image: "/filters/fisheye-matcha.webp"
  },
  {
    id: "Japanese_high_school",
    name: "Japanese High School Student",
    prompt: "A daily snapshot taken with a low-quality disposable camera. A clumsy photo taken by a Japanese high school student. (Aspect ratio 3:2 is recommended)",
    image: "/filters/high-schol.png"
  },
  {
    id: "silicon_valley_style",
    name: "Silicon Valley Style",
    prompt: "Keep the facial features of the person in the uploaded image exactly consistent . Dress them in a professional navy blue business suit with a white shirt, similar to the reference image. Background : Place the subject against a clean, solid dark gray studio photography backdrop . The background should have a subtle gradient , slightly lighter behind the subject and darker towards the edges (vignette effect). There should be no other objects. Photography Style : Shot on a Sony A7III with an 85mm f/1.4 lens , creating a flattering portrait compression. Lighting : Use a classic three-point lighting setup . The main key light should create soft, defining shadows on the face. A subtle rim light should separate the subject's shoulders and hair from the dark background. Crucial Details : Render natural skin texture with visible pores , not an airbrushed look. Add natural catchlights to the eyes . The fabric of the suit should show a subtle wool texture.Final image should be an ultra-realistic, 8k professional headshot.",
    image: "/filters/images.webp"
  }
];

export enum ToolType {
  MOVE = "MOVE",
  RECTANGLE = "RECTANGLE",
  BRUSH = "BRUSH",
  ERASER = "ERASER",
}
