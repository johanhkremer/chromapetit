'useServer'

import { prisma } from "@/prisma";
import { Paint } from "@prisma/client";

export const getPaints = async (): Promise<Paint[]> => {
    try {
        const paints = await prisma.paint.findMany();
        console.log("Paints fetched:", paints);
        return paints;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching paints:", error.message);
        } else {
            console.error("Error fetching paints:", error);
        }
        throw new Error("Failed to fetch paints.");
    }
};