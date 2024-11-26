import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { itemWarehoseService } from '../services'
import { IItem } from '../types'

/**
 * Хук для обновления элемента на складе.
 *
 * @param {() => void} refetch - Функция для обновления списка элементов склада.
 */
export function useUpdateItemMutation(refetch: () => void) {
	const { mutate: updateItem, isPending } = useMutation({
		mutationKey: ['update item'],
		mutationFn: (values: Partial<IItem>) =>
			itemWarehoseService.updateItem(values.id as string, values),
		onSuccess() {
			toast.success('Элемент успешно обновлен на складе')
			refetch()
		},
		onError() {
			toast.error('Ошибка при обновлении элемента')
		}
	})

	return { updateItem, isPending }
}
