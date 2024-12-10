import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// Skapa Prisma-klienten
const prisma = new PrismaClient();

// Definiera en typ för Paint (kan justeras beroende på exakt struktur på din data)
interface Paint {
    name: string;
    brand: string;
    hexCode: string;
    type: string;
    discontinued: boolean;
    finish: string | null;  // För att tillåta nullvärde om finish inte finns
}

async function main() {
    // Läs in JSON-filen och parsar den
    const filePath = path.join(__dirname, '../paintsData.json'); // Justera vägen om det behövs
    const paintsData: Paint[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const paint of paintsData) {
        // Skapa en färg i databasen
        await prisma.paint.create({
            data: {
                name: paint.name,
                brand: paint.brand,
                hexCode: paint.hexCode,
                type: paint.type,
                discontinued: paint.discontinued,
                finish: paint.finish || null, // Om finish är undefined, sätt till null
            },
        });
    }

    console.log('Färger har lagts till!');
}

// Kör main-funktionen
main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();  // Koppla från Prisma
    });
