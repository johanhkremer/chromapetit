// /scripts/updateColorsWithRgb.ts

import { PrismaClient } from "@prisma/client";

// Initiera Prisma Client
const prisma = new PrismaClient();

// Funktion för att konvertera HEX till RGB
function hexToRgb(hex: string): { red: number; green: number; blue: number } {
    const parsedHex = hex.startsWith("#") ? hex.slice(1) : hex;
    const bigint = parseInt(parsedHex, 16);

    return {
        red: (bigint >> 16) & 255,
        green: (bigint >> 8) & 255,
        blue: bigint & 255,
    };
}

async function updateColorsWithRgb() {
    console.log("Starting the update process...");

    // Hämta alla färger från databasen
    const colors = await prisma.paint.findMany();

    // Gå igenom alla färger och uppdatera med RGB-värden
    for (const color of colors) {
        if (!color.hexCode) {
            console.warn(`Color with ID ${color.id} has no hexCode, skipping.`);
            continue;
        }

        const rgb = hexToRgb(color.hexCode);

        await prisma.paint.update({
            where: { id: color.id },
            data: {
                red: rgb.red,
                green: rgb.green,
                blue: rgb.blue,
            },
        });

        console.log(`Updated color ID ${color.id} with RGB: ${JSON.stringify(rgb)}`);
    }

    console.log("All colors updated successfully!");
    await prisma.$disconnect();
}

// Kör scriptet
updateColorsWithRgb().catch((error) => {
    console.error("An error occurred:", error);
    prisma.$disconnect();
    process.exit(1);
});
