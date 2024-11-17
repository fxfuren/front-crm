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
		const response = await api.get<{ data: IOrder[] }>('orders')
		return response.data
	}
}

export const ordersService = new OrderService()
