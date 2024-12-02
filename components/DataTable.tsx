"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
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
import { useState } from "react"
import { Button } from "./ui/button"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { useResponsiveColumnVisibility } from "@/hooks/useResponsiveColumnVisibility"

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
    const [isSearchSimilarPaints, setIsSearchSimilarPaints] = useState<boolean>(false)

    const initialVisibility = {
        hexCode: true,
        rgbValues: false,
        name: true,
        brand: true,
        type: true,
        finish: true,
        updatedAt: true,
        actions: true,
    };

    const { columnVisibility, setColumnVisibility } = useResponsiveColumnVisibility(initialVisibility);


    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
        onColumnVisibilityChange: (visibility) => setColumnVisibility(visibility),
    })

    return (
        <div>
            {/* Search Input */}
            <div className="flex items-center py-4">
                <Input
                    placeholder={
                        !isSearchSimilarPaints
                            ? ('Filter name')
                            : ('Find similar paints')
                    }
                    value={
                        !isSearchSimilarPaints
                            ? (table.getColumn("name")?.getFilterValue() as string) ?? ""
                            : (table.getColumn("brand")?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) => {
                        if (!isSearchSimilarPaints) {
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        } else {
                            table.getColumn("brand")?.setFilterValue(event.target.value)
                        }
                    }}
                    className="max-w-sm"
                />
                <div className="flex items-center m-3 space-x-3">
                    <Switch
                        id="search"
                        checked={isSearchSimilarPaints}
                        onCheckedChange={setIsSearchSimilarPaints}
                    />
                    <Label htmlFor="search">{!isSearchSimilarPaints ? ("Search by Name") : ("Search for Similar Colors")}</Label>
                </div>
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