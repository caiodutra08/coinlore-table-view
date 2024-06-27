"use client";

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
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import React from "react";
import { Search } from "@/components/ui/search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	ArrowBigLeftDash,
	ArrowBigRightDash,
	ChevronLeft,
	ChevronRight,
	CloudDownload,
	ListFilterIcon,
	Menu,
	Plus,
	Trash,
} from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export default function DataTable<TData, TValue>({
	columns,
	data,
}: TableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([
		{
			id: "rank",
			desc: false,
		},
	]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<>
			<div className="flex flex-row items-center py-4 px-4 justify-between">
				<div className="flex flex-row items-center gap-4 w-3/4">
					<h3 className="text-lg text-gray-900">Coinlore</h3>
					<Badge variant="outline" className="w-max bg-gray-50">
						<p className="text-xs font-normal text-wrap w-max text-[rgb(0,112,255)]">
							{data.length} coins
						</p>
					</Badge>
					<Search
						placeholder="Search"
						value={
							(table.getColumn("combined")?.getFilterValue() as string) ?? ""
						}
						onChange={(event) => {
							table.getColumn("combined")?.setFilterValue(event.target.value);
						}}
						className="w-full drop-shadow-md"
					/>
				</div>
				<div className="hidden flex-row gap-4 w-2/4 text-gray-700 justify-end font-medium text-sm sm:flex">
					<Button variant="ghost" className="flex flex-row items-center gap-2">
						<Trash size={20} />
						<p className="text-wrap hidden lg:block">Delete</p>
					</Button>
					<Button variant="ghost" className="flex flex-row items-center gap-2">
						<ListFilterIcon size={20} />
						<p className="text-wrap hidden lg:block">Filter</p>
					</Button>
					<Button
						variant="outline"
						className="flex flex-row items-center gap-2"
					>
						<CloudDownload size={20} />
						<p className="text-wrap hidden lg:block">Export</p>
					</Button>
					<Button
						className="flex flex-row items-center gap-2 bg-[rgb(0,112,255)] hover:bg-[rgb(0,102,255)] text-white"
						variant="secondary"
					>
						<Plus size={20} />
						<p className="text-wrap hidden xl:flex">Add New Coin</p>
					</Button>
				</div>
				<div className="flex sm:hidden">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="flex flex-row items-center">
								<Menu size={20} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem className="flex justify-center">
								<Button variant="outline" className="flex flex-row items-center">
									<Trash size={20} />
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem className="flex justify-center">
								<Button variant="outline" className="flex flex-row items-center">
									<ListFilterIcon size={20} />
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem className="flex justify-center">
								<Button
									variant="outline"
									className="flex flex-row items-center"
								>
									<CloudDownload size={20} />
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem className="flex justify-center">
								<Button
									className="flex flex-row items-center bg-[rgb(0,112,255)] hover:bg-[rgb(0,102,255)] text-white"
									variant="secondary"
								>
									<Plus size={20} />
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className="border">
				<Table>
					<TableHeader className="bg-gray-50 text-xs font-normal">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const hide = header.column.columnDef.enableHiding;

									const isColumnSelectIdOrName =
										header.column.id === "select" ||
										header.column.id === "name" ||
										header.column.id === "id";

									const columnTextLeft = isColumnSelectIdOrName
										? "text-left"
										: "text-right text-[--webkit-right]";

									return (
										<TableHead
											key={header.id}
											className={cn(columnTextLeft, "text-gray-500")}
											hidden={hide}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
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
									{row.getVisibleCells().map((cell, idx) => {
										const hide = cell.column.columnDef.enableHiding;

										return (
											<TableCell
												className={
													idx === 1
														? "font-medium"
														: "font-normal text-gray-500"
												}
												key={cell.id}
												hidden={hide}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										);
									})}
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
			<div className="flex items-center p-4 justify-center sm:justify-between">
				<div className="text-sm text-muted-foreground hidden sm:flex">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="flex flex-row items-center gap-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to first page</span>
						<ArrowBigLeftDash className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<div className="flex w-[100px] items-center justify-center text-sm font-medium">
						Page {table.getState().pagination.pageIndex + 1} of{" "}
						{table.getPageCount()}
					</div>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to next page</span>
						<ChevronRight className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to last page</span>
						<ArrowBigRightDash className="h-4 w-4" />
					</Button>
				</div>
				<div className="flex-row items-center gap-2 hidden sm:flex">
					<p className="text-sm font-medium">Rows per page</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							{[10, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</>
	);
}
