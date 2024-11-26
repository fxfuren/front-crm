import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ordersService } from '../services'
import { IOrder } from '../types'

/**
 * Хук для обновления заказа.
 *
 * @param {() => void} refetch - Функция для обновления списка заказов.
 */
export function useUpdateOrderMutation(refetch: () => void) {
	const { mutate: updateOrder, isPending } = useMutation({
		mutationKey: ['update order'],
		mutationFn: (values: Partial<IOrder>) =>
			ordersService.updateOrder(values.id as string, values),
		onSuccess() {
			toast.success('Заказ успешно обновлен')
			refetch()
		},
		onError() {
			toast.error('Ошибка при обновлении заказа')
		}
	})

	return { updateOrder, isPending }
}
