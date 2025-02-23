"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/table-pagination";
import { Table as TableCore } from "@tanstack/table-core";
import Image from "next/image";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page?: number;
  pageSize?: number;
  pageCount?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  filterComponent?: (table: TableCore<TData>) => React.ReactNode;
}

export function DataTable<TData, TValue>({
  page,
  pageSize,
  pageCount,
  onPageChange,
  onPageSizeChange,
  columns, data, filterComponent }: DataTableProps<TData, TValue>) {

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
  });

  return (
    <div>
      {filterComponent && <div className="px-8 py-3">{filterComponent(table)}</div>}
      <Table>
        <TableHeader className="whitespace-nowrap">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow key={rowIndex} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <TableCell key={`${rowIndex}-${cellIndex}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24">
                <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
                  <span className="text-gray-400 text-[14px] font-normal">No hay resultados.</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="py-3 px-4">
        <DataTablePagination
          table={table}
          page={page}
          pageSize={pageSize}
          pageCount={pageCount}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange} />
      </div>
    </div>
  );
}

