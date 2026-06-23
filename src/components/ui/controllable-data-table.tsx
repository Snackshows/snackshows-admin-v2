import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
	getPaginationRowModel,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	className?: string;
	loading?: boolean;
	actionButton?: React.ReactNode;
}

export function ControllableDataTable<TData, TValue>({
	columns,
	data,
	className,
	loading = false,
	actionButton,
}: DataTableProps<TData, TValue>) {
	const [globalFilter, setGlobalFilter] = useState('');
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const table = useReactTable({
		data,
		columns,
		state: {
			globalFilter,
			pagination,
		},
		enableGlobalFilter: true,
		onGlobalFilterChange: setGlobalFilter,
		onPaginationChange: setPagination,
		getPaginationRowModel: getPaginationRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		globalFilterFn: (row, _columnId, filterValue) => {
			const search = String(filterValue).toLowerCase();

			return Object.values(row.original ?? {}).some((val) =>
				String(val ?? '')
					.toLowerCase()
					.includes(search)
			);
		},
		// globalFilterFn: 'includesString', // ✅ use this first
	});

	const page = table.getState()?.pagination?.pageIndex;
	const pageSize = table.getState()?.pagination?.pageSize;

	const total = table.getCoreRowModel()?.rows?.length; // total before filtering
	const filtered = table.getFilteredRowModel()?.rows?.length; // after filtering

	const start = filtered === 0 ? 0 : page * pageSize + 1;
	const end = Math.min(start + pageSize - 1, filtered);

	return (
		<div className="w-full ">
			<div className="flex flex-col-reverse  justify-between gap-4 py-4 md:flex-row lg:items-center">
				<span className="flex items-center gap-2">
					Show
					<select
						value={table.getState().pagination.pageSize}
						onChange={(e) => table.setPageSize(Number(e.target.value))}
						className="max-w-sm border"
					>
						{[10, 20, 30, 50, 100].map((size) => (
							<option key={size} value={size}>
								{size}
							</option>
						))}
					</select>
					entries
				</span>
				<div className="flex items-center gap-2">
					{actionButton}
					<Input
						placeholder="Search All columns..."
						value={globalFilter ?? ''}
						onChange={(e) => setGlobalFilter(e.target.value)}
						className="max-w-sm"
					/>
				</div>
			</div>

			<div className="w-full overflow-hidden rounded-none border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className={''}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											className="text-center text-wrap "
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
					<TableBody className={className ?? 'text-sm'}>
						{loading ? (
							[...Array(5)].map((_, index) => (
								<TableRow key={index}>
									{columns.map((_, colIndex) => (
										<TableCell key={colIndex}>
											<div className="h-4 w-full animate-pulse rounded bg-gray-200" />
										</TableCell>
									))}
								</TableRow>
							))
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									className="even:bg-[#f5f5f5] hover:bg-[#f5f5f5]"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="text-center align-top">
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
			<div className="flex w-full items-center justify-end space-x-2 py-4">
				<div className="text-muted-foreground order-red-500 flex-1 text-left text-sm">
					{/* {table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected. */}
					{filtered !== total
						? `Showing ${start} to ${end} of ${filtered} entries (filtered from ${total} total entries)`
						: `Showing ${start} to ${end} of ${total} entries`}

					{/* Showing {start} to {end} of {total} entries */}
				</div>
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
	);
}
