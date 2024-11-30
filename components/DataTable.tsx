"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DataTablePagination } from "./DataTablePagination"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    })

    // Manage column visibility based on screen size
    useEffect(() => {
        const mediaQueries = [
            window.matchMedia("(max-width: 639px)"), // None (e.g., iPhone SE)
            window.matchMedia("(min-width: 640px) and (max-width: 767px)"), // sm
            window.matchMedia("(min-width: 768px) and (max-width: 1023px)"), // md
            window.matchMedia("(min-width: 1024px) and (max-width: 1279px)"), // lg
            window.matchMedia("(min-width: 1280px)"), // xl
        ];

        const updateVisibility = () => {
            if (mediaQueries[0].matches) {
                setColumnVisibility({
                    hexCode: true,
                    name: true,
                    brand: false,
                    type: false,
                    finish: false,
                    updatedAt: false,
                    actions: true,
                });
            } else if (mediaQueries[1].matches) {
                setColumnVisibility({
                    hexCode: true,
                    name: true,
                    brand: true,
                    type: false,
                    finish: false,
                    updatedAt: false,
                    actions: true,
                });
            } else if (mediaQueries[2].matches) {
                setColumnVisibility({
                    hexCode: true,
                    name: true,
                    brand: true,
                    type: true,
                    finish: false,
                    updatedAt: false,
                    actions: true,
                });
            } else if (mediaQueries[3].matches) {
                setColumnVisibility({
                    hexCode: true,
                    name: true,
                    brand: true,
                    type: true,
                    finish: true,
                    updatedAt: false,
                    actions: true,
                });
            } else if (mediaQueries[4].matches) {
                setColumnVisibility({
                    hexCode: true,
                    name: true,
                    brand: true,
                    type: true,
                    finish: true,
                    updatedAt: true,
                    actions: true,
                });
            }
        };

        updateVisibility();

        mediaQueries.forEach((mq) => mq.addEventListener("change", updateVisibility));

        return () => {
            mediaQueries.forEach((mq) => mq.removeEventListener("change", updateVisibility));
        };
    }, []);


    return (
        <div>
            {/* Search Input */}
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter name..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                {/* Column visibility */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {/* Data table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}