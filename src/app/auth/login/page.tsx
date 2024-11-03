import { Metadata } from 'next'

import { LoginForm } from '@/features/auth/components/LoginForm'

export const metadata: Metadata = {
	title: 'Войти в аккаунт'
}

export default function LoginPage() {
	return <LoginForm />
}
