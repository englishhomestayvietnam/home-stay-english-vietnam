import { PrismaClient } from "./app/generated/prisma";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const DEFAULT_ACTIVITIES = [
  {
    title: "Saturday Cultural Exchange & Cooking",
    subtitle: "Vietnamese Culinary Masterclass & Story Sharing",
    schedule: "Every Saturday",
    icon: "Utensils",
    description: "Every Saturday afternoon, our homestay community opens its doors for a vibrant cultural exchange and Vietnamese cooking class. Volunteers, students, and local staff gather to learn, cook, and feast together.",
    highlights: [
      "Master traditional Vietnamese dishes (Pho, fresh Spring Rolls, Bun Cha, and Vietnamese Egg Coffee)",
      "Open to all Vietnamese staff, local students, and foreign volunteers",
      "Exchange languages, stories, and cultural traditions over a family-style meal",
      "100% free activity focused on building community and sharing local heritage"
    ],
    order: 0,
  },
  {
    title: "Monthly Hanoi Trips & Excursions",
    subtitle: "Explore the Beautiful Landscapes & History of Northern Vietnam",
    schedule: "Once a Month",
    icon: "Compass",
    description: "English Homestay organizes monthly excursions to help volunteers and local students step outside the classroom and discover the wonders of Hanoi and its surrounding areas.",
    highlights: [
      "Guided visits to Hanoi's historic quarters, temples, and famous museums",
      "Trips to traditional craft villages (Bat Trang Ceramics, Quang Phu Cau Incense Village)",
      "Weekend hikes, nature exploration, and scenic escapes in Hanoi's surrounding provinces",
      "A fantastic bonding opportunity for the entire community outside the homestay environment"
    ],
    order: 1,
  }
];

async function main() {
  const extractedDir = path.join(process.cwd(), "public", "fun-activities", "extracted");
  const files = fs.readdirSync(extractedDir).filter(f => f.endsWith(".jpeg") || f.endsWith(".jpg"));
  
  // Create relative paths for the frontend
  const imageUrls = files.map(f => `/fun-activities/extracted/${f}`);
  
  // Split images roughly in half
  const half = Math.ceil(imageUrls.length / 2);
  const cookingImages = imageUrls.slice(0, half);
  const tripImages = imageUrls.slice(half);

  console.log("Clearing existing activities...");
  await prisma.funActivity.deleteMany();

  console.log("Inserting default activities...");
  
  await prisma.funActivity.create({
    data: {
      ...DEFAULT_ACTIVITIES[0],
      images: cookingImages,
    }
  });

  await prisma.funActivity.create({
    data: {
      ...DEFAULT_ACTIVITIES[1],
      images: tripImages,
    }
  });

  console.log("Successfully seeded activities!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
