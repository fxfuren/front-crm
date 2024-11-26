import { api } from '@/shared/api'

import type { IItem } from '../types'

/**
 * Сервис для работы с элементами склада.
 */
class ItemWarehoseService {
	/**
	 * Получает все позиции на складах.
	 *
	 * @returns {Promise<any[]>} - Массив позиций на складе.
	 */
	public async getItems() {
		const response = await api.get<IItem>('items')
		return response
	}

	/**
	 * Добавление нового заказа.
	 *
	 * @param {Partial<IItem>} body - Данные нового товара.
	 * @returns {Promise<IItem>} - Ответ с данными созданного товара.
	 */
	public async addItem(body: Partial<IItem>) {
		const response = await api.post<IItem>('items/new', body)
		return response
	}

	/**
	 * Удаление товара со склада.
	 *
	 * @param {string} itemId - Идентификатор товара для удаления.
	 * @returns {Promise<void>} - Пустой ответ при успешном удалении.
	 */
	public async deleteItem(itemId: string) {
		await api.delete(`items/${itemId}`)
	}

	/**
	 * Обновляет элемент склада по его ID.
	 *
	 * @param {string} itemId - ID элемента для обновления.
	 * @param {Partial<IItem>} body - Данные для обновления.
	 * @returns {Promise<IItem>} - Обновленный элемент.
	 */
	public async updateItem(itemId: string, body: Partial<IItem>) {
		const response = await api.patch<IItem>(`items/${itemId}`, body)
		return response
	}
}

export const itemWarehoseService = new ItemWarehoseService()
