import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
    const paintsData = JSON.parse(fs.readFileSync('paintsData.json', 'utf8'));

    // Rensa gamla färger
    await prisma.paint.deleteMany();

    for (const paint of paintsData) {
        await prisma.paint.create({
            data: {
                name: paint.name,
                brand: paint.brand,
                hexCode: paint.hexCode,
                opacity: paint.opacity ?? null,
                category: paint.category,
                tags: paint.tags ?? [],
                discontinued: paint.discontinued ?? false,
                description: paint.description ?? null,
                blue: paint.blue,
                green: paint.green,
                red: paint.red,
            },
        });
    }

    console.log('Colors have been added!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
