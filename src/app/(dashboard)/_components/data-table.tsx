"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ArrowUpRight,
  ChevronDown,
  MoreHorizontal,
  PenLine,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: User[] = [
  {
    id: "m5gr84i9",
    address: "Jl. Wahid Sangit rt 01/rw 07 No.12",
    status: "stunting berat",
    parents_name: "Ahmad Susanto",
    childs_name: "Sari Susanto",
  },
  {
    id: "3u1reuv4",
    address: "Jl. Wahid Sangit rt 01/rw 07 No.12",
    status: "stunting",
    parents_name: "Budi Hartono",
    childs_name: "Andi Hartono",
  },
  {
    id: "derv1ws0",
    address: "Jl. Wahid Sangit rt 01/rw 07 No.12",
    status: "stunting",
    parents_name: "Siti Nurhaliza",
    childs_name: "Maya Nurhaliza",
  },
  {
    id: "5kma53ae",
    address: "Jl. Wahid Sangit rt 01/rw 07 No.12",
    status: "stunting berat",
    parents_name: "Joko Widodo",
    childs_name: "Rina Widodo",
  },
  {
    id: "bhqecj4p",
    address: "Jl. Wahid Sangit rt 01/rw 07 No.12",
    status: "normal",
    parents_name: "Indira Sari",
    childs_name: "Dian Sari",
  },
];

export type User = {
  id: string;
  address: string;
  status: "stunting berat" | "stunting" | "normal";
  parents_name: string;
  childs_name: string;
};

// Updated responsive columns with better mobile handling
export function DataTable({ isCadre }: { isCadre: boolean }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Define columns inside component so isCadre is available
  const columns: ColumnDef<User>[] = React.useMemo(
    () => [
      {
        accessorKey: "parents_name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold"
            >
              Nama Orang Tua
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("parents_name")}</div>
        ),
      },
      {
        accessorKey: "childs_name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold"
            >
              Nama Anak
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("childs_name")}</div>
        ),
      },
      {
        accessorKey: "address",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold hidden lg:flex"
            >
              Alamat
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="text-sm text-muted-foreground hidden lg:block max-w-[200px] truncate">
            {row.getValue("address")}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <div className="flex gap-2 items-center">
            <div
              className={`${
                row.getValue("status") === "stunting berat"
                  ? "bg-red-500"
                  : row.getValue("status") === "stunting"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              } w-3 h-3 rounded-full flex-shrink-0`}
            ></div>
            <div className="capitalize text-sm font-medium hidden sm:block">
              {row.getValue("status")}
            </div>
          </div>
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-1">
              {/* Detail button - always visible */}
              <Button variant="outline" className="h-8 w-8 p-0">
                <span className="sr-only">Detail Anak</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>

              {/* Edit button - always visible on desktop */}
              <Button variant="outline" className="h-8 w-8 p-0 hidden md:flex">
                <span className="sr-only">Kalkulator</span>
                <PenLine className="h-4 w-4" />
              </Button>

              {/* Delete button - only visible for cadres on desktop */}
              {isCadre && (
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0 hidden md:flex"
                >
                  <span className="sr-only">Delete User</span>
                  <Trash className="h-4 w-4" />
                </Button>
              )}

              {/* Mobile dropdown for additional actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="md:hidden">
                  <Button variant="outline" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <PenLine className="mr-2 h-4 w-4" />
                    Kalkulator
                  </DropdownMenuItem>

                  {/* Delete option in mobile dropdown - only for cadres */}
                  {isCadre && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [isCadre]
  ); // Add isCadre as dependency

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full space-y-4">
      {/* Header Controls - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4">
        <Input
          placeholder="Cari Nama Orang Tua"
          value={
            (table.getColumn("parents_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("parents_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="sm:ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
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
                    {column.id === "parents_name"
                      ? "Nama Orang Tua"
                      : column.id === "childs_name"
                      ? "Nama Anak"
                      : column.id === "address"
                      ? "Alamat"
                      : column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Responsive Table with Horizontal Scroll */}
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="whitespace-nowrap px-2 sm:px-4"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
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
                      <TableCell
                        key={cell.id}
                        className="whitespace-nowrap px-2 sm:px-4"
                      >
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
        </div>
      </div>

      {/* Footer Controls - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 py-4">
        <div className="text-muted-foreground text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
