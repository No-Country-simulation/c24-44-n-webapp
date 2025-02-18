"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchInputProps {
    value: string
    onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {

    return (
        <div className="w-full max-w-[214px] flex flex-row-reverse gap-3">
            
            <Input
                className="pr-9 py-2 rounded-lg border border-gray-200 h-full"
                placeholder="Search"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                icon={<Search className="text-gray-400" />}
            />
        </div>
    )
}