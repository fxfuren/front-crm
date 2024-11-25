'use client'

import { DataTable } from '@/features/dashboard/components/data-table/data-table'

import { Skeleton } from '@/shared/components/ui'
import { ResponsiveDialog } from '@/shared/components/ui/ResponsiveDialog'

import { useGetItemsOnWarehouse } from '../hooks'

import { WarehouseForm } from './WarehouseForm'
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
			<ResponsiveDialog
				title='Добавить товар'
				description='Форма добавления товара'
			>
				<WarehouseForm />
			</ResponsiveDialog>
		</div>
	)
}
