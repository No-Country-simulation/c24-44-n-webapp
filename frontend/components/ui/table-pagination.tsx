'use client'

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useEffect } from "react";

interface PaginationProps {
  table?: any;
  page?: number;
  pageSize?: number;
  pageCount?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export function DataTablePagination({
  table,
  page,
  pageSize,
  pageCount,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize, table]);

  const handlePageSizeChange = (value: string) => {
    const newSize = Number(value);
    const currentIndex = ((page ?? 1) - 1) * (pageSize ?? 10);
    const newPage = Math.floor(currentIndex / newSize) + 1;

    if (onPageSizeChange) {
      onPageSizeChange(newSize);
    }
    table.setPageSize(newSize);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center gap-4 px-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium whitespace-nowrap">
          Page {page} of {pageCount}
        </span>
        <div className="flex flex-row gap-1">
          <Button
            variant="outline"
            onClick={() => onPageChange && onPageChange(1)}
            disabled={page === 1}
            className=" h-8 w-8 p-0 hidden md:flex"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => onPageChange && onPageChange((page ?? 1) - 1)}
            disabled={page === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            onClick={() => onPageChange && onPageChange((page ?? 1) + 1)}
            disabled={page === pageCount}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => onPageChange && pageCount !== undefined && onPageChange(pageCount)}
            disabled={page === pageCount}
            className="hidden h-8 w-8 p-0 md:flex"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>

      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Items: </span>
        <Select
          value={(pageSize ?? 10).toString()}
          onValueChange={handlePageSizeChange}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {[2, 5, 10, 20, 50, 100].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}