import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Funktion for converting HEX to RGB
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

    // Get all colors from DB
    const colors = await prisma.paint.findMany();

    // Go through all colors and update with RGB if HEX-coda available
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

updateColorsWithRgb().catch((error) => {
    console.error("An error occurred:", error);
    prisma.$disconnect();
    process.exit(1);
});
