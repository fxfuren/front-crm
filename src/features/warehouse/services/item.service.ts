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
}

export const itemWarehoseService = new ItemWarehoseService()
