"use server";

import { prisma } from "@/prisma";

export const getPaints = async () => {
    try {
        const paints = await prisma.paint.findMany();
        if (!paints.length) {
            return new Response(JSON.stringify({ message: "No paints found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
        return new Response(JSON.stringify(paints), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching paints:", error.message);
        } else {
            console.error("Error fetching paints:", error);
        }
        throw new Error("Failed to fetch paints.");
    }
};
