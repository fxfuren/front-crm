'use client'

import { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'

import { Button, Input } from '@/shared/components/ui'

import { priorities, statuses } from '../../data/data'

import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
	table: Table<TData>
}

export function DataTableToolbar<TData>({
	table
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0

	return (
		<div className='flex items-center justify-between'>
			<div className='flex flex-1 items-center space-x-2'>
				<Input
					placeholder='Поиск...'
					value={
						(table
							.getColumn('title')
							?.getFilterValue() as string) ?? ''
					}
					onChange={event =>
						table
							.getColumn('title')
							?.setFilterValue(event.target.value)
					}
					className='h-8 w-[150px] lg:w-[250px]'
				/>
				{table.getColumn('status') && (
					<DataTableFacetedFilter
						column={table.getColumn('status')}
						title='Статус'
						options={statuses}
					/>
				)}
				{table.getColumn('priority') && (
					<DataTableFacetedFilter
						column={table.getColumn('priority')}
						title='Приоритет'
						options={priorities}
					/>
				)}
				{isFiltered && (
					<Button
						variant='ghost'
						onClick={() => table.resetColumnFilters()}
						className='h-8 px-2 lg:px-3'
					>
						Сбросить
						<X />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	)
}
