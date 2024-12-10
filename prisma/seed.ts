import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
    const paintsData = JSON.parse(fs.readFileSync('paintsData.json', 'utf8'));

    for (const paint of paintsData) {
        await prisma.paint.create({
            data: {
                name: paint.name,
                brand: paint.brand,
                hexCode: paint.hexCode,
                type: paint.type,
                discontinued: paint.discontinued,
                finish: paint.finish,
            },
        });
    }

    console.log('Färger har lagts till!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
