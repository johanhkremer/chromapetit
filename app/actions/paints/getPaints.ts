"use server";

export const dynamic = 'force-dynamic';

import { prisma } from "@/prisma";

export const getPaints = async () => {
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
