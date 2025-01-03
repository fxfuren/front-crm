import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useProfile } from '@/shared/hooks'
import { toastMessageHandler } from '@/shared/utils'

import type { TypeSettingsSchema } from '../schemes'
import { userService } from '../services'

/**
 * Хук для выполнения мутации обновления профиля пользователя.
 */
export function useUpdateProfileMutation() {
	const { refetch } = useProfile()
	const queryClient = useQueryClient()

	const { mutate: update, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: ({ values }: { values: TypeSettingsSchema }) =>
			userService.updateProfile(values),
		onSuccess() {
			toast.success('Профиль успешно обновлён')
			refetch()
			queryClient.removeQueries({ queryKey: ['orders'] })
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { update, isLoadingUpdate }
}
