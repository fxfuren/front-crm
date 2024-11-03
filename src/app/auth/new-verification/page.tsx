import { NewVerificationForm } from '@/features/auth/components/NewVerificationForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Подтверждение почты'
}

export default function NewVerificationPage() {
	return <NewVerificationForm />
}