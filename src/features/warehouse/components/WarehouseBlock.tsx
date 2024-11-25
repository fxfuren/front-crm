'use client'

import React from 'react'

import { DataTable } from '@/features/dashboard/components/data-table/data-table'

import { Skeleton } from '@/shared/components/ui'
import { ResponsiveDialog } from '@/shared/components/ui/ResponsiveDialog'

import { useGetItemsOnWarehouse } from '../hooks'
import { IItem } from '../types'

import { WarehouseForm } from './WarehouseForm'
import { itemColumns } from './items-columns'

export function WarehouseBlock() {
	const { items, isLoading } = useGetItemsOnWarehouse()
	const [editingItem, setEditingItem] = React.useState<IItem | null>(null)
	const [isEditingOpen, setEditingOpen] = React.useState(false)

	const handleEdit = (item: IItem) => {
		setEditingItem(item)
		setEditingOpen(true)
	}

	const handleAddItem = () => {
		setEditingItem(null)
		setEditingOpen(true)
	}

	return (
		<div className='flex flex-col space-y-3'>
			{isLoading ? (
				<div className='flex flex-col space-y-2'>
					<Skeleton className='h-96 w-full' />
				</div>
			) : (
				<DataTable
					data={items || []}
					columns={itemColumns(handleEdit)}
				/>
			)}

			<ResponsiveDialog
				title={
					editingItem ? 'Редактировать элемент' : 'Добавить элемент'
				}
				description={
					editingItem
						? 'Измените данные элемента'
						: 'Форма добавления нового элемента'
				}
				isOpen={isEditingOpen}
				onClose={() => setEditingOpen(false)}
				onOpen={handleAddItem}
			>
				<WarehouseForm
					defaultValues={editingItem || undefined}
					onSubmit={() => setEditingOpen(false)}
				/>
			</ResponsiveDialog>
		</div>
	)
}
