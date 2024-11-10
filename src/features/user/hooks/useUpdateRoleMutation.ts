import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeUpdateRoleSchema, UpdateRoleSchema } from '../schemes'
import { userService } from '../services'

import { useGetUsers } from './useGetUsers'

/**
 * Хук для выполнения мутации обновления роли пользователя.
 */
export function useUpdateRoleMutation() {
	const { refetch } = useGetUsers()
	const { mutate: update, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update role'],
		mutationFn: async ({
			userId,
			role
		}: {
			userId: string
			role: TypeUpdateRoleSchema
		}) => {
			const validatedData = UpdateRoleSchema.parse(role)
			return await userService.updateRoleUser(userId, validatedData)
		},
		onSuccess() {
			toast.success('Роль успешно обновлёна')
			refetch()
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { update, isLoadingUpdate }
}
