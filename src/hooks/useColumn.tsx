"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import { useMemo } from "react";

const useColumns = () => {
	const columnsData = useMemo(() => {
		return [
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() && "indeterminate")
						}
						onCheckedChange={(value) =>
							table.toggleAllPageRowsSelected(!!value)
						}
						aria-label="Select all"
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label="Select row"
						className=""
					/>
				),
				enableSorting: false,
				enableHiding: false,
			},
			{
				accessorKey: "id",
				header: "ID",
				cell: ({ row }) => {
					const id = String(row.getValue("id"));
					return <div className="text-left">{id}</div>;
				},
			},
			{
				accessorKey: "name",
				header: ({ column }) => {
					return (
						<Button
							variant="ghost"
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === "asc")
							}
							className="p-0 hover:bg-transparent"
						>
							Name
							{column.getIsSorted() === "asc" ? (
								<ArrowDown className="ml-2 h-4 w-4" />
							) : (
								<ArrowUp className="ml-2 h-4 w-4" />
							)}
						</Button>
					);
				},
			},
			{
				accessorKey: "rank",
				header: ({ column }) => {
					return (
						<Button
							variant="ghost"
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === "asc")
							}
							className="p-0 hover:bg-transparent"
						>
							Rank
							{column.getIsSorted() === "asc" ? (
								<ArrowDown className="ml-2 h-4 w-4" />
							) : (
								<ArrowUp className="ml-2 h-4 w-4" />
							)}
						</Button>
					);
				},
				cell: ({ row }) => {
					const rank = String(row.getValue("rank"));
					return <div className="text-center">{rank}</div>;
				},
				enableGlobalFilter: false,
			},
			{
				accessorKey: "price_usd",
				header: ({ column }) => {
					return (
						<Button
							variant="ghost"
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === "asc")
							}
							className="p-0 hover:bg-transparent"
						>
							Price (USD)
							{column.getIsSorted() === "asc" ? (
								<ArrowDown className="ml-2 h-4 w-4" />
							) : (
								<ArrowUp className="ml-2 h-4 w-4" />
							)}
						</Button>
					);
				},
				cell: ({ row }) => {
					const price = parseFloat(row.getValue("price_usd"));
					const formatted = new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
					}).format(price);
					return <div className="text-right">{formatted}</div>;
				},
				enableGlobalFilter: false,
			},
			{
				accessorKey: "percent_change_24h",
				header: ({ column }) => {
					return (
						<Button
							variant="ghost"
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === "asc")
							}
							className="p-0 hover:bg-transparent"
						>
							24 %
							{column.getIsSorted() === "asc" ? (
								<ArrowDown className="ml-2 h-4 w-4" />
							) : (
								<ArrowUp className="ml-2 h-4 w-4" />
							)}
						</Button>
					);
				},
				cell: ({ row }) => {
					const pctg = parseFloat(row.getValue("percent_change_24h"));
					const pctgVariant = pctg > 0 ? "goingUp" : "goingDown";
					return (
						<Badge
							variant={pctgVariant}
							className="flex flex-row items-center w-20 justify-center float-right"
						>
							{pctgVariant === "goingUp" ? (
								<ChevronUp size={16} strokeWidth={2} />
							) : (
								<ChevronDown size={16} strokeWidth={2} />
							)}
							{pctg}%
						</Badge>
					);
				},
				enableGlobalFilter: false,
			},
			{
				accessorKey: "price_btc",
				header: ({ column }) => {
					return (
						<Button
							variant="ghost"
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === "asc")
							}
							className="p-0 hover:bg-transparent"
						>
							Price (BTC)
							{column.getIsSorted() === "asc" ? (
								<ArrowDown className="ml-2 h-4 w-4" />
							) : (
								<ArrowUp className="ml-2 h-4 w-4" />
							)}
						</Button>
					);
				},
				cell: ({ row }) => {
					const price = parseFloat(row.getValue("price_btc"));
					const formatted = new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "USD",
						maximumSignificantDigits: 20,
					}).format(price);
					return <div className="text-right">{formatted}</div>;
				},
				enableGlobalFilter: false,
			},
			{
				accessorKey: "market_cap_usd",
				header: ({ column }) => {
					return (
						<Button
							variant="ghost"
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === "asc")
							}
							className="p-0 hover:bg-transparent"
						>
							Market Cap (USD)
							{column.getIsSorted() === "asc" ? (
								<ArrowDown className="ml-2 h-4 w-4" />
							) : (
								<ArrowUp className="ml-2 h-4 w-4" />
							)}
						</Button>
					);
				},
				cell: ({ row }) => {
					const price = Number(row.getValue("market_cap_usd"));
					const formattedMarketCap = Math.floor(price).toLocaleString("en-US", {
						style: "currency",
						currency: "USD",
						minimumFractionDigits: 0,
					});

					return <div className="text-right">{formattedMarketCap}</div>;
				},
				enableGlobalFilter: false,
			},
			{
				accessorKey: "combined",
				isPlaceholder: true,
				enableHiding: true,
				cell: ({ row }) => {
					const combined = String(row.getValue("combined"));
					return <div className="text-left">{combined}</div>;
				},
			},
		] as ColumnDef<any>[];
	}, []);

	return { columnsData };
};

export default useColumns;
