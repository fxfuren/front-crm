import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { itemWarehoseService } from '../services'
import { IItem } from '../types'

import { useGetFirstWarehouse } from './useGetFirstWarehouse'

/**
 * Хук для добавления товара на склад.
 *
 * @param {() => void} refetch - Функция для обновления списка товаров.
 */
export function useAddItemOnWarehouseMutation(refetch: () => void) {
	const { firstWarehouse, isLoading: isLoadingWarehouse } =
		useGetFirstWarehouse()

	const { mutate: addItem, isPending } = useMutation({
		mutationKey: ['add item'],
		mutationFn: (values: Partial<IItem>) => {
			if (!firstWarehouse) {
				throw new Error('Нет доступных складов')
			}
			return itemWarehoseService.addItem({
				...values,
				warehouseId: firstWarehouse.id
			})
		},
		onSuccess(data) {
			toast.success('Товар успешно добавлен')
			refetch()
		},
		onError(error) {
			toast.error('Ошибка при добавлении товара')
		}
	})

	return { addItem, isPending, isLoadingWarehouse }
}
