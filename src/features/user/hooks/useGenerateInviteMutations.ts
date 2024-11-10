import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { userService } from '../services'

import { useTokens } from './useTokens'

/**
 * Хук для выполнения мутации генерации токена приглашения.
 */
export function useGenerateInviteMutations() {
	const { refetch } = useTokens()
	const { mutate: generateInviteToken, isPending: isGeneratingToken } =
		useMutation({
			mutationKey: ['generate-invite'],
			mutationFn: async () => {
				const response = await userService.generateInviteToken()
				return response
			},
			onSuccess() {
				toast.success('Ссылка успешно сгенерирована')
				refetch()
			},
			onError(error) {
				toastMessageHandler(error)
			}
		})

	return { generateInviteToken, isGeneratingToken }
}
