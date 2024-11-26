/**
 * Интерфейс для модели товара.
 */
export interface IItem {
	id: string
	name: string
	quantity: number
	warehouseId: string
	createdAt: Date
	updatedAt: Date
}
