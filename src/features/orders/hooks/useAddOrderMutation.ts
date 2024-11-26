import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ordersService } from '../services'
import { IOrder, OrderStatus } from '../types'

/**
 * Хук для добавления заказа.
 *
 * @param {string} technicianId - ID текущего техника.
 * @param {() => void} refetch - Функция для обновления списка заказов.
 */
export function useAddOrderMutation(technicianId: string, refetch: () => void) {
	const { mutate: addOrder, isPending } = useMutation({
		mutationKey: ['add order'],
		mutationFn: (values: Partial<IOrder>) =>
			ordersService.addOrder({
				...values,
				technicianId,
				status: OrderStatus.Pending
			}),
		onSuccess(data) {
			toast.success('Заказ успешно добавлен')
			refetch()
		},
		onError(error) {
			toast.error('Ошибка при добавлении заказа')
		}
	})

	return { addOrder, isPending }
}
