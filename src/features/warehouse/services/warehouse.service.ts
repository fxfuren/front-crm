import { api } from '@/shared/api'

import { IWarehouse } from '../types'

/**
 * Сервис для работы со складом.
 */
class WarehouseService {
	/**
	 * Получает все cклады.
	 *
	 * @returns {Promise<any[]>} - Массив складов.
	 */
	public async getFirstWarehouse() {
		const response = await api.get<IWarehouse>('warehouses/one')
		return response
	}
}

export const warehouseService = new WarehouseService()
