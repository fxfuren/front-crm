import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ordersService } from '../services'

/**
 * Хук для удаления заказа.
 *
 * @param {() => void} refetch - Функция для обновления списка заказов.
 */
export function useDeleteOrderMutation(refetch: () => void) {
	const { mutate: deleteOrder, isPending } = useMutation({
		mutationKey: ['delete order'],
		mutationFn: (orderId: string) => ordersService.deleteOrder(orderId),
		onSuccess() {
			toast.success('Заказ успешно удален')
			refetch()
		},
		onError() {
			toast.error('Ошибка при удалении заказа')
		}
	})

	return { deleteOrder, isPending }
}
