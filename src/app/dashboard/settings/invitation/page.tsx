'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { InviteTokenList } from '@/features/user/components'
import { useGenerateInviteMutations } from '@/features/user/hooks'

import {
	Button,
	Card,
	CardContent,
	Form,
	Label,
	Loading
} from '@/shared/components/ui'

/**
 * Страница для генерации токенов приглашения.
 */
export default function InvitePage() {
	const { generateInviteToken, isGeneratingToken } =
		useGenerateInviteMutations()
	const [inviteTokens, setInviteTokens] = useState<
		{ token: string; expiresIn: Date }[]
	>([])
	const form = useForm()
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

	const onSubmit = () => {
		generateInviteToken(undefined, {
			onSuccess: data => {
				if (data?.token && data?.expiresIn) {
					setInviteTokens(prevTokens => [
						...prevTokens,
						{
							token: data.token,
							expiresIn: new Date(data.expiresIn)
						}
					])
				}
			}
		})
	}

	return (
		<div className='space-y-5'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-2'
				>
					<Label htmlFor='terms' className=''>
						Ссылка на приглашения
					</Label>
					<Card>
						<CardContent>
							<InviteTokenList
								tokens={inviteTokens}
								baseUrl={baseUrl}
							/>
						</CardContent>
					</Card>
					<Button type='submit' disabled={isGeneratingToken}>
						{isGeneratingToken
							? 'Генерация...'
							: 'Сгенерировать ссылку'}
					</Button>
				</form>
			</Form>
			{isGeneratingToken && <Loading />}
		</div>
	)
}
