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
  Plus,
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

// Generic data type
export type TableData = Record<string, any>;

// Column configuration types
export interface StatusConfig {
  value: string;
  color: "red" | "yellow" | "green" | "blue" | "purple" | "gray";
  label?: string;
}

export interface ActionConfig<T = any> {
  icon: React.ReactNode;
  label: string;
  onClick: (row: T) => void;
  variant?: "default" | "destructive";
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
  requiresPermission?: boolean;
}

export interface ColumnConfig<T = any> {
  key: string;
  header: string;
  type?: "text" | "status" | "actions";
  sortable?: boolean;
  hiddenOnMobile?: boolean;
  hiddenOnTablet?: boolean;
  width?: string;
  statusConfig?: StatusConfig[];
  actions?: ActionConfig<T>[];
  render?: (value: any, row: T) => React.ReactNode;
}

export interface DataTableProps<T extends TableData> {
  data: T[];
  columns: ColumnConfig<T>[];
  searchable?: {
    key: string;
    placeholder: string;
  };
  permissions?: {
    canEdit?: boolean;
    canDelete?: boolean;
    canView?: boolean;
  };
  onRowClick?: (row: T) => void;
  className?: string;
  showRowNumbers?: boolean;
  rowNumbersConfig?: {
    header?: string;
    startFrom?: number;
  };

  tambahButton?: {
    label?: string; // default: "Tambah"
    href?: string; // dynamic URL
    enabled?: boolean; // default: true
  };
  isLoading?: boolean;
}

export function DataTable<T extends TableData>({
  data,
  columns,
  searchable,
  permissions = {},
  onRowClick,
  className = "",
  showRowNumbers = false,
  rowNumbersConfig = {},
  tambahButton = {},
  isLoading = false,
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Helper function to get status color classes
  const getStatusColorClass = (color: string) => {
    const colorMap = {
      red: "bg-red-500",
      yellow: "bg-yellow-500",
      green: "bg-green-500",
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      gray: "bg-gray-500",
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-500";
  };

  // Generate table columns based on configuration
  const tableColumns: ColumnDef<T>[] = React.useMemo(() => {
    const cols: ColumnDef<T>[] = [];

    // Add row numbers column if enabled
    if (showRowNumbers) {
      const { header = "No.", startFrom = 1 } = rowNumbersConfig;

      cols.push({
        id: "__row_number__",
        header: () => <div className="text-center font-semibold">{header}</div>,
        enableHiding: false,
        enableSorting: false,
        size: 60,
        cell: ({ row, table }) => {
          const pageIndex = table.getState().pagination.pageIndex;
          const pageSize = table.getState().pagination.pageSize;
          const rowIndex = row.index;
          const globalRowNumber = pageIndex * pageSize + rowIndex + startFrom;

          return (
            <div className="text-center font-mono text-sm font-medium min-w-[48px] flex items-center justify-center">
              {globalRowNumber}
            </div>
          );
        },
      });
    }

    // Add configured columns
    const configuredColumns = columns.map((col) => {
      const baseColumn: ColumnDef<T> = {
        accessorKey: col.key,
        enableHiding: col.type !== "actions",
      };

      // Header configuration
      if (col.sortable && col.type !== "actions") {
        baseColumn.header = ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className={`h-auto p-0 font-semibold ${
              col.hiddenOnMobile ? "hidden lg:flex" : ""
            } ${col.hiddenOnTablet ? "hidden xl:flex" : ""}`}
          >
            {col.header}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      } else if (col.type !== "actions") {
        baseColumn.header = col.header;
      } else {
        baseColumn.header = "";
      }

      // Cell configuration
      baseColumn.cell = ({ row }): React.ReactNode => {
        const value: string = row.getValue(col.key);

        // Custom render function
        if (col.render) {
          return col.render(value, row.original);
        }

        // Status column
        if (col.type === "status" && col.statusConfig) {
          const statusItem = col.statusConfig.find((s) => s.value === value);
          if (statusItem) {
            return (
              <div className="flex gap-2 items-center">
                <div
                  className={`${getStatusColorClass(
                    statusItem.color
                  )} w-3 h-3 rounded-full flex-shrink-0`}
                />
                <div className="capitalize text-sm font-medium hidden sm:block">
                  {statusItem.label || value}
                </div>
              </div>
            );
          }
        }

        // Actions column
        if (col.type === "actions" && col.actions) {
          const visibleDesktopActions = col.actions.filter(
            (action) =>
              action.showOnDesktop !== false &&
              (!action.requiresPermission ||
                checkPermission(action, permissions))
          );

          const mobileActions = col.actions.filter(
            (action) =>
              action.showOnMobile !== false &&
              (!action.requiresPermission ||
                checkPermission(action, permissions))
          );

          return (
            <div className="flex items-center gap-1">
              {/* Desktop actions */}
              {visibleDesktopActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-8 w-8 p-0 hidden md:flex"
                  onClick={() => action.onClick(row.original)}
                >
                  <span className="sr-only">{action.label}</span>
                  {action.icon}
                </Button>
              ))}

              {/* Mobile dropdown */}
              {mobileActions.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="md:hidden">
                    <Button variant="outline" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {mobileActions.map((action, index) => (
                      <DropdownMenuItem
                        key={index}
                        className={
                          action.variant === "destructive" ? "text-red-600" : ""
                        }
                        onClick={() => action.onClick(row.original)}
                      >
                        {action.icon}
                        <span className="ml-2">{action.label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          );
        }

        // Default text column
        const responsiveClasses = `
          ${col.hiddenOnMobile ? "hidden lg:block" : ""}
          ${col.hiddenOnTablet ? "hidden xl:block" : ""}
          ${col.width ? col.width : ""}
        `.trim();

        return (
          <div className={`font-medium ${responsiveClasses}`}>
            {typeof value === "string" || typeof value === "number"
              ? value
              : String(value || "")}
          </div>
        );
      };

      return baseColumn;
    });

    cols.push(...configuredColumns);
    return cols;
  }, [columns, permissions, showRowNumbers, rowNumbersConfig]);

  // Helper function to check permissions
  const checkPermission = (
    action: ActionConfig<T>,
    perms: typeof permissions
  ) => {
    if (action.label.toLowerCase().includes("delete")) {
      return perms.canDelete !== false;
    }
    if (action.label.toLowerCase().includes("edit")) {
      return perms.canEdit !== false;
    }
    if (action.label.toLowerCase().includes("view")) {
      return perms.canView !== false;
    }
    return true;
  };

  const table = useReactTable({
    data,
    columns: tableColumns,
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
    <div className={`w-full space-y-2 ${className}`}>
      {tambahButton.enabled === true && (
        <Button
          asChild
          className=" outline-primary border-primary text-primary"
          variant={"outline"}
        >
          <a href={tambahButton.href}>
            <Plus />
            {tambahButton.label || "Tambah"}
          </a>
        </Button>
      )}
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4">
        {searchable && (
          <Input
            placeholder={searchable.placeholder}
            value={
              (table.getColumn(searchable.key)?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn(searchable.key)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}

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
                const columnConfig = columns.find(
                  (col) => col.key === column.id
                );
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {columnConfig?.header || column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={`whitespace-nowrap px-2 sm:px-4 ${
                        header.id === "__row_number__" ? "w-16 text-center" : ""
                      }`}
                    >
                      {header.isPlaceholder
                        ? null
                        : (flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          ) as React.ReactNode)}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => onRowClick?.(row.original)}
                    className={
                      onRowClick ? "cursor-pointer hover:bg-muted/50" : ""
                    }
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
                    colSpan={tableColumns.length}
                    className="h-24 text-center"
                  >
                    Belum ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Footer */}
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
