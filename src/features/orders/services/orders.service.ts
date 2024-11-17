import { api } from '@/shared/api'

import { IOrder } from '../types'

/**
 * Сервис для работы заказами.
 */
class OrderService {
	/**
	 * Получает все закаы.
	 *
	 * @returns {Promise<any[]>} - Массив заказов.
	 */
	public async getOrders() {
		const response = await api.get<IOrder>('orders')
		return response
	}
}

export const ordersService = new OrderService()
