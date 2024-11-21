'use client'

import { DataTable } from '@/features/dashboard/components/data-table/data-table'
import { OrderForm, orderColumns } from '@/features/orders/components'
import { useGetOrders } from '@/features/orders/hooks'

import { Skeleton } from '@/shared/components/ui'
import { ResponsiveDialog } from '@/shared/components/ui/ResponsiveDialog'

export function OrdersBlock() {
	const { orders, isLoading } = useGetOrders()

	return (
		<div className='flex flex-col space-y-3'>
			{isLoading ? (
				<div className='flex flex-col space-y-2'>
					<Skeleton className='h-96 w-full' />
				</div>
			) : (
				<DataTable data={orders || []} columns={orderColumns} />
			)}
			<ResponsiveDialog
				title='Добавить заказ'
				description='Форма добавления заказа'
			>
				<OrderForm />
			</ResponsiveDialog>
		</div>
	)
}
