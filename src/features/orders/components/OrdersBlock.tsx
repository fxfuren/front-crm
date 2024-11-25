'use client'

import React from 'react'

import { DataTable } from '@/features/dashboard/components/data-table/data-table'
import { OrderForm, orderColumns } from '@/features/orders/components'
import { useGetOrders } from '@/features/orders/hooks'

import { Skeleton } from '@/shared/components/ui'
import { ResponsiveDialog } from '@/shared/components/ui/ResponsiveDialog'

import { IOrder } from '../types'

export function OrdersBlock() {
	const { orders, isLoading } = useGetOrders()
	const [editingOrder, setEditingOrder] = React.useState<IOrder | null>(null)
	const [isEditingOpen, setEditingOpen] = React.useState(false)

	const handleEdit = (order: IOrder) => {
		setEditingOrder(order)
		setEditingOpen(true)
	}

	const handleAddOrder = () => {
		setEditingOrder(null)
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
					data={orders || []}
					columns={orderColumns(handleEdit)}
				/>
			)}

			<ResponsiveDialog
				title={editingOrder ? 'Редактировать заказ' : 'Добавить заказ'}
				description={
					editingOrder
						? 'Измените данные заказа'
						: 'Форма добавления нового заказа'
				}
				isOpen={isEditingOpen}
				onClose={() => setEditingOpen(false)}
				onOpen={handleAddOrder}
			>
				<OrderForm
					defaultValues={editingOrder || undefined}
					onSubmit={() => setEditingOpen(false)}
				/>
			</ResponsiveDialog>
		</div>
	)
}
