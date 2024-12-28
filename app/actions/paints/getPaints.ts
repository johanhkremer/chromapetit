"use server";

import { prisma } from "@/prisma";

export const getPaints = async () => {
    try {
        const paints = await prisma.paint.findMany();
        console.log("Paints:", paints);
        return paints;
    } catch (error) {
        console.error("Error fetching paints:", error);
        throw new Error("Failed to fetch paints.");
    }
};