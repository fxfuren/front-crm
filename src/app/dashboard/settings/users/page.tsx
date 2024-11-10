'use client'

import { useGetUsers } from '@/features/user/hooks'
import { IUser } from '@/features/user/types'

import {
	Avatar,
	AvatarFallback,
	Card,
	CardContent
} from '@/shared/components/ui'
import { useProfile } from '@/shared/hooks'

export default function ProfilePage() {
	const { users } = useGetUsers()
	const { user } = useProfile()

	if (!users || !user) return null

	return (
		<div className='space-y-5 text-center'>
			<Card className='mt-4 w-full border-none'>
				<CardContent className='max-h-[500px] overflow-y-auto'>
					<div className='space-y-4'>
						{users
							.filter((users: IUser) => users.id !== user.id)
							.map((users: IUser, index: number) => (
								<div
									key={index}
									className='flex items-center space-x-4'
								>
									<Avatar className='hidden h-9 w-9 sm:flex'>
										<AvatarFallback>
											{users.displayName.slice(0, 1)}
										</AvatarFallback>
									</Avatar>
									<div className='grid gap-1'>
										<p className='text-start text-sm font-medium leading-none'>
											{users.displayName}
										</p>
										<p className='text-sm text-muted-foreground'>
											{users.email},{' '}
											{users.role === 'ADMIN'
												? 'Администратор'
												: 'Сотрудник'}
										</p>
									</div>
								</div>
							))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
