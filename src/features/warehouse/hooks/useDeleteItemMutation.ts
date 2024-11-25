import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { itemWarehoseService } from '../services'

/**
 * Хук для удаления товара со склада.
 *
 * @param {() => void} refetch - Функция для обновления списка товаров.
 */
export function useDeleteItemFromWarehouseMutation(refetch: () => void) {
	const { mutate: deleteItem, isPending } = useMutation({
		mutationKey: ['delete item'],
		mutationFn: (itemId: string) => itemWarehoseService.deleteItem(itemId),
		onSuccess() {
			toast.success('Товар успешно удален со склада')
			refetch()
		},
		onError(error) {
			toast.error(`Ошибка при удалении товара`)
		}
	})

	return { deleteItem, isPending }
}
