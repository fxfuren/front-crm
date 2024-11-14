import type { IUser } from '@/features/user/types'

/**
 * Перечисление для статусов заказов.
 */
export enum OrderStatus {
	IN_PROGRESS = 'В процессе',
	Completed = 'Завершен',
	PENDING = 'В очереди',
	CANCELLED = 'Отменен'
}
/**
 * Интерфейс для модели заказа.
 */
export interface IOrder {
	id: string
	customer: string
	device: string
	issue: string
	technician: IUser
	technicianId: string
	status: OrderStatus
	createdAt: Date
	completedAt: Date | null
}
