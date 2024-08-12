"use client"
import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserCheck } from "lucide-react";
import Link from "next/link";
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table"
import { useState } from "react";

interface DataTablePros<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
export function PersonTable<TData, TValue>({
  columns, data
}: DataTablePros<TData, TValue> ){
  const [sorting, setSorting] = useState<SortingState>([])
  const [filtering, setFiltering] = useState('')
  const [columnVisibility, setColumVisibility] = useState<VisibilityState>({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumVisibility,
    onGlobalFilterChange: setFiltering,
    onSortingChange: setSorting,
    state: { 
      sorting,
      globalFilter: filtering,
      columnVisibility,
    }
  })
  return(
    <div className="space-y-9">
      <div className="flex items-center gap-2">
        <div className="w-full flex justify-between relative">
            <Input
              placeholder="Search name"
              value={filtering}
              onChange={(event)=> {setFiltering(event.target.value)}}
              className="w-full md:max-w-sm"
            />
            <Card.Root className='flex justify-center'>
              <Link href={"/dashboard/register-users"}>
                <Button className="flex gap-2">
                  <UserCheck size={16} />
                  Cadastrar clientes
                </Button>
              </Link>
            </Card.Root>
        </div>
      </div>
      <ScrollArea className="rounded-md border h-[calc(80vh-220px)]">
        <Table>
          <TableHeader className="bg-gray-900">
            {table.getHeaderGroups().map((headerGroup)=> (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header)=> {
                  return(
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
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
        </Table>
      </ScrollArea>
      
    </div>
  )
}