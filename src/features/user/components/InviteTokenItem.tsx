'use client'

import { useEffect, useState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/shared/components/ui'

export const InviteTokenItem: React.FC<{
	token: string
	expiresIn: Date
	baseUrl: string
}> = ({ token, expiresIn, baseUrl }) => {
	const [timeLeft, setTimeLeft] = useState<number>(
		Math.floor((expiresIn.getTime() - Date.now()) / 1000)
	)

	useEffect(() => {
		const interval = setInterval(() => {
			const remainingTime = Math.floor(
				(expiresIn.getTime() - Date.now()) / 1000
			)
			setTimeLeft(remainingTime)

			if (remainingTime <= 0) {
				clearInterval(interval)
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [expiresIn])

	const copyToClipboard = async () => {
		const { toast } = await import('sonner')

		const link = `${baseUrl}/auth/register?inviteToken=${token}`
		navigator.clipboard.writeText(link)

		toast.success('Ссылка скопирована в буфер обмена!')
	}

	const hours = Math.floor(timeLeft / 3600)
	const minutes = Math.floor((timeLeft % 3600) / 60)
	return (
		<>
			<div onClick={copyToClipboard} className='cursor-pointer'>
				<Alert>
					<AlertTitle>{`${baseUrl}/auth/register?inviteToken=...`}</AlertTitle>
				</Alert>
			</div>
			<AlertDescription className='ml-3'>
				Ссылка будет действительнаㅤ
				<strong>
					{timeLeft > 0 ? (
						<>
							{hours > 0 && <span>{hours} ч </span>}
							{minutes} мин
						</>
					) : (
						<span>Срок действия истек</span>
					)}
				</strong>
			</AlertDescription>
		</>
	)
}
