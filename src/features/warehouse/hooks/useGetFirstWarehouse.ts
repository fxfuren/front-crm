import { useQuery } from '@tanstack/react-query'

import { warehouseService } from '../services'

// Импортируем сервис

/**
 * Хук для получения первого склада.
 */
export function useGetFirstWarehouse() {
	const {
		data: firstWarehouse,
		isLoading,
		refetch
	} = useQuery({
		queryKey: ['firstWarehouse'],
		queryFn: () => warehouseService.getFirstWarehouse(),
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false
	})

	return {
		firstWarehouse,
		isLoading,
		refetch
	}
}
