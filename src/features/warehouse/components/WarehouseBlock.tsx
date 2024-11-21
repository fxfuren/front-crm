'use client'

import { DataTable } from '@/features/dashboard/components/data-table/data-table'

import { Skeleton } from '@/shared/components/ui'

import { useGetItemsOnWarehouse } from '../hooks'

import { itemColumns } from './items-columns'

export function WarehouseBlock() {
	const { items, isLoading } = useGetItemsOnWarehouse()

	return (
		<div className='flex flex-col space-y-3'>
			{isLoading ? (
				<div className='flex flex-col space-y-2'>
					<Skeleton className='h-96 w-full' />
				</div>
			) : (
				<DataTable data={items || []} columns={itemColumns} />
			)}
		</div>
	)
}
