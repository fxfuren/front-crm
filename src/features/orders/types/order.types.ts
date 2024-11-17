import { CheckCircle, Circle, CircleOff, Timer } from 'lucide-react'

import type { IUser } from '@/features/user/types'

/**
 * Перечисление для статусов заказов.
 */
export enum OrderStatus {
	Pending = 'PENDING',
	InProgress = 'IN_PROGRESS',
	Completed = 'COMPLETED',
	Canceled = 'CANCELLED'
}

/**
 * Массив локализации для статусов.
 */
export const statusLabels: { [key in OrderStatus]: string } = {
	[OrderStatus.InProgress]: 'В процессе',
	[OrderStatus.Completed]: 'Завершен',
	[OrderStatus.Pending]: 'В очереди',
	[OrderStatus.Canceled]: 'Отменен'
}

/**
 * Массив иконок для статусом.
 */
export const statusIcons = {
	[OrderStatus.InProgress]: Timer,
	[OrderStatus.Completed]: CheckCircle,
	[OrderStatus.Pending]: Circle,
	[OrderStatus.Canceled]: CircleOff
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
