import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { pageConfig } from '@/shared/config'

import { verificationService } from '../services'

/**
 * Хук для выполнения мутации подтверждения электронной почты.
 */
export function useVerificationMutation() {
	const router = useRouter()

	const { mutate: verification } = useMutation({
		mutationKey: ['new verification'],
		mutationFn: (token: string | null) =>
			verificationService.newVerification(token),
		onSuccess() {
			toast.success('Почта успешно подтверждена')
			router.push(pageConfig.dashboard.main)
		},
		onError() {
			router.push(pageConfig.auth.login)
		}
	})

	return { verification }
}
