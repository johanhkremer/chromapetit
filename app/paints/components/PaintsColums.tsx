"use client"

import { ColumnDef } from "@tanstack/react-table"
import ColorCircle from "@/components/ColorCircle"
import { Button } from "@/components/ui/button"
import { Paint } from "@/app/types/colors.types"
import { ArrowUpDown } from "lucide-react"

export const paintColumns: ColumnDef<Paint>[] = [
    {
        accessorKey: "hexCode",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Color
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex justify-center items-center">
                <ColorCircle
                    hexCode={row.original.hexCode}
                    size="sm"
                    finish={row.original.finish}
                />
            </div>
        ),
    },
    {
        accessorKey: "rgbValues",
        header: "RGB",
        cell: ({ row }) => {
            const { red, green, blue } = row.original;
            return (
                <span>({red}, {green}, {blue})</span>
            );
        }
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "brand",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Brand
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="text-center">{row.original.brand}</div>
        ),
    },
    {
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="text-center">{row.original.type}</div>
        ),
    },
    {
        accessorKey: "finish",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Finish
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="text-center">{row.original.finish}</div>
        ),
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Updated
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = row.original.updatedAt
                ? new Date(row.original.updatedAt)
                : new Date(row.original.createdAt)
            return date.toISOString().split("T")[0]
        },
    },
    {
        id: "actions",
        header: "Find similar paints",
        cell: () => <Button>Search</Button>,
    },
]
