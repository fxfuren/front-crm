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

	/**
	 * Добавление нового заказа.
	 *
	 * @param {Partial<IOrder>} body - Данные нового заказа.
	 * @returns {Promise<IOrder>} - Ответ с данными созданного заказа.
	 */
	public async addOrder(body: Partial<IOrder>) {
		const response = await api.post<IOrder>('orders/new', body)
		return response
	}
}

export const ordersService = new OrderService()
