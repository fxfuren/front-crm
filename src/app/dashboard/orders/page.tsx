'use client'

import { DataTable } from '@/features/dashboard/components/data-table/data-table'
import { columns } from '@/features/orders/components'
import { IOrder, OrderStatus } from '@/features/orders/types'
import { UserRole } from '@/features/user/types'

const orders: IOrder[] = [
	{
		id: 'ORDER-1234',
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
		status: OrderStatus.IN_PROGRESS,
		createdAt: new Date(),
		completedAt: null
	}
]

export default function OrdersPage() {
	return (
		<div className='h-full flex-1 flex-col space-y-8 p-8 md:ml-0 md:flex'>
			<DataTable data={orders} columns={columns} />
		</div>
	)
}
