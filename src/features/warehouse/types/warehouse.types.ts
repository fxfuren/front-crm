import { IItem } from './item.types'

/**
 * Интерфейс для модели склада.
 */
export interface IWarehouse {
	id: string
	name: string
	location?: string
	items: IItem[] // Массив товаров, привязанных к складу
	createdAt: Date
	updatedAt: Date
}
