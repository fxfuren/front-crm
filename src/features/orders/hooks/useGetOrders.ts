import { useQuery } from '@tanstack/react-query'

import { ordersService } from '../services'

/**
 * Хук для получения всех заказов.
 */
export function useGetOrders() {
	const {
		data: orders,
		isLoading,
		refetch
	} = useQuery({
		queryKey: ['orders'],
		queryFn: () => ordersService.getOrders(),
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false
	})

	return {
		orders,
		isLoading,
		refetch
	}
}
