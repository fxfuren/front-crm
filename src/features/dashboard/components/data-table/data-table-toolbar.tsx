'use client'

import { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import React from 'react'

import { OrderStatus, statusIcons, statusLabels } from '@/features/orders/types'

import { Button } from '@/shared/components/ui'

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
				{table.getColumn('status') && (
					<DataTableFacetedFilter
						column={table.getColumn('status')}
						title='Статус'
						options={Object.values(OrderStatus).map(status => ({
							label: (
								<div className='flex items-center space-x-2'>
									{React.createElement(statusIcons[status])}
									<span>{statusLabels[status]}</span>
								</div>
							),
							value: status
						}))}
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
