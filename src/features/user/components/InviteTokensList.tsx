'use client'

import {
	Alert,
	AlertDescription,
	AlertTitle,
	Skeleton
} from '@/shared/components/ui'

import { useTokens } from '../hooks'

import { InviteTokenItem } from './InviteTokenItem'

type InviteTokenListProps = {
	baseUrl: string
}

export const InviteTokenList: React.FC<InviteTokenListProps> = ({
	baseUrl
}) => {
	const { userTokens, isLoading } = useTokens()

	if (isLoading) {
		return (
			<div className='mt-5'>
				<Alert>
					<AlertTitle>
						<Skeleton className='h-4 w-full' />
					</AlertTitle>
				</Alert>
				<AlertDescription className='ml-3 mt-4'>
					<Skeleton className='h-5 w-[300px]' />
				</AlertDescription>
			</div>
		)
	}

	return (
		<div className='mt-5'>
			{userTokens && userTokens.length > 0 ? (
				<div className='space-y-4'>
					{userTokens.map((tokenData, index) => (
						<InviteTokenItem
							key={index}
							token={tokenData.token}
							expiresIn={new Date(tokenData.expiresIn)}
							baseUrl={baseUrl}
						/>
					))}
				</div>
			) : (
				<p>Нет доступных приглашений</p>
			)}
		</div>
	)
}
