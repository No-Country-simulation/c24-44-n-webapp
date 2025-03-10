"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { useParams } from "next/navigation";
import { ArrowDown, ArrowRight, ChevronDown, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/component/common/search/search-input";
import { dateRangeFilter } from "@/component/common/table/filters";
import { ToggleActiveButton } from "./changeStatusPropertie";
import { DataTable } from "@/component/common/table/data-table";

export default function PropertiesHistoryTableCard() {
    const params = useParams();
    const { key } = params;
    const keyString = Array.isArray(key) ? key[0] : key;
    const [pageSize, setPageSize] = useState<number>(20)
    const [page, setPage] = useState<number>(1)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [agreements, setAgreements] = useState<any>({ items: [], pageCount: 1 })

    const [debouncedSearchTerm] = useDebounce(searchTerm, 300)

    const fetchAgreements = useCallback(async () => {
        try {
         /*   const response = await getAgreements({
                page,
                pageSize,
                key: keyString,
                search: debouncedSearchTerm
            });
            if ('items' in response) {
                setAgreements(response);
            } else {
                console.error('Failed to fetch agreements:', response);
            }*/
        } catch (error) {
            console.error(error)
        }
    }, [page, pageSize, debouncedSearchTerm]);

    useEffect(() => {
        fetchAgreements();
    }, [fetchAgreements]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setPage(1);
    };

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "name",
            header: "Nombre",
            cell: ({ row }: { row: any }) => {
                return <p className="text-[#4B5563] whitespace-nowrap">{row.original.name}</p>;
            },
        },
        {
            accessorKey: "acronym",
            header: "Siglas",
            cell: ({ row }: { row: any }) => {
                return <p className="text-[#4B5563] whitespace-nowrap">{row.original.acronym}</p>;
            },
        },
       
        {
            accessorKey: "createdAt",
            header: () => (
                <div className="flex items-center gap-1">
                    Fecha de creación
                    <ChevronDown className="size-4 text-gray-600 hover:cursor-pointer" />
                </div>),
            filterFn: dateRangeFilter<any>(),
            cell: ({ row }) => {
                const formattedDate = new Date(row.original.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                });
                return <p className="text-[#4B5563] whitespace-nowrap">{formattedDate}</p>;
            },
        },
        {
            accessorKey: "active",
            header: () => (
                <div className="flex items-center gap-1">
                    status
                    <ChevronDown className="size-4 text-gray-600 hover:cursor-pointer" />
                </div>
            ),
            cell: ({ row }) => <ToggleActiveButton row={row.original} onStatusChange={fetchAgreements} />,
        },
       
       
        {
            id: "actions",
            cell: ({ row }) => {
                return (
                    <div className="flex gap-1 items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="view-service-details"

                        >
                            <Link href={`/${keyString}/agreements/contracts/${row.original.id}`}>
                                <Eye className="h-5 w-5" />
                            </Link>
                        </Button>
                        {/*
                        <EditAgreement agreement={row.original} onCompanyUpdate={fetchAgreements} /> 
                        */}
                       
                    </div>
                );
            },
        },
    ];

    return (
        <Card className="w-full">
            <CardHeader className="py-4 gap-4 justify-between flex flex-col md:flex-row space-y-0 lg:h-[72px] items-center">
                <p className="whitespace-nowrap text-[18px] flex flex-col lg:justify-center font-bold">Lista de propiedades</p>
                <div className="flex flex-row w-auto justify-between gap-2 md:justify-end">
                    <SearchInput
                        value={searchTerm}
                        onChange={setSearchTerm}
                    />
                    <Button>Crear publicacion</Button>
                    {/* 
                    <CreateAgreementFormButton onAgreementCreate={fetchAgreements} />*/}
                </div>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
                <DataTable
                    columns={columns}
                    data={agreements.items}
                    page={page}
                    pageSize={pageSize}
                    pageCount={agreements.pageCount}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            </CardContent>
        </Card>
    );
}