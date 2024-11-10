import { useQuery } from '@tanstack/react-query'

import { userService } from '@/features/user/services'

/**
 * Хук для получения токенов приглашения.
 */
export function useTokens() {
	const {
		data: userTokens,
		isLoading,
		refetch
	} = useQuery({
		queryKey: ['invite-tokens'],
		queryFn: () => userService.getInviteTokens(),
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnMount: false
	})

	return {
		userTokens,
		isLoading,
		refetch
	}
}
