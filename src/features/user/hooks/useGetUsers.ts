import { useQuery } from '@tanstack/react-query'

import { userService } from '@/features/user/services'

/**
 * Хук для получения всех зарегистрированных пользователей.
 */
export function useGetUsers() {
	const {
		data: users,
		isLoading,
		refetch
	} = useQuery({
		queryKey: ['users'],
		queryFn: () => userService.getUsers(),
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false
	})

	return {
		users,
		isLoading,
		refetch
	}
}
