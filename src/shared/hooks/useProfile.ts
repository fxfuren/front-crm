import { useQuery } from '@tanstack/react-query'

import { userService } from '@/features/user/services'

/**
 * Хук для получения профиля пользователя.
 */
export function useProfile() {
	const {
		data: user,
		isLoading,
		refetch
	} = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.findProfile(),
		staleTime: Infinity, // Данные сохраняются до конца сессии
		refetchOnWindowFocus: false, // Не обновлять при возвращении фокуса на вкладку
		refetchOnMount: false // Не обновлять при каждом монтировании
	})

	return {
		user,
		isLoading,
		refetch // Позволяет триггерить обновление вручную
	}
}
