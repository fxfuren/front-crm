'use client'

import { DataTable } from '@/features/dashboard/components/data-table/data-table'
import { orderColumns } from '@/features/orders/components'
import { IOrder, OrderStatus } from '@/features/orders/types'
import { UserRole } from '@/features/user/types'

const orders: IOrder[] = [
	{
		id: 'ORDER-14',
		customer: 'Иван Иванов',
		device: 'iPhone 12',
		issue: 'Не включается',
		technician: {
			id: 'TECH-1',
			email: 'technician@example.com',
			password: 'password123',
			displayName: 'Техник A',
			role: UserRole.Admin,
			isVerified: true,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		},
		technicianId: 'TECH-1',
		status: OrderStatus.InProgress,
		createdAt: new Date(),
		completedAt: null
	},
	{
		id: 'ORDER-15',
		customer: 'Вадим Смирнов',
		device: 'iPhone 12 pro max',
		issue: 'Замена батареии',
		technician: {
			id: 'TECH-1',
			email: 'technician@example.com',
			password: 'password123',
			displayName: 'Техник A',
			role: UserRole.Admin,
			isVerified: true,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		},
		technicianId: 'TECH-1',
		status: OrderStatus.InProgress,
		createdAt: new Date(),
		completedAt: null
	}
]

export default function OrdersPage() {
	return (
		<div className='h-full flex-1 flex-col space-y-8 p-8 md:ml-0 md:flex'>
			<DataTable data={orders} columns={orderColumns} />
		</div>
	)
}
