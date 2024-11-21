import { useQuery } from '@tanstack/react-query'

import { itemWarehoseService } from '../services'

/**
 * Хук для получения всех позиций на складах.
 */
export function useGetItemsOnWarehouse() {
	const {
		data: items,
		isLoading,
		refetch
	} = useQuery({
		queryKey: ['items'],
		queryFn: () => itemWarehoseService.getItems(),
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false
	})

	return {
		items,
		isLoading,
		refetch
	}
}
