'use client'

import { UserRoleButton } from '@/features/user/components'
import { useGetUsers } from '@/features/user/hooks'
import { IUser } from '@/features/user/types'

import {
	Avatar,
	AvatarFallback,
	Card,
	CardContent
} from '@/shared/components/ui'
import { useProfile } from '@/shared/hooks'

export function UsersBlock() {
	const { users } = useGetUsers()
	const { user } = useProfile()

	if (!users || !user) return null

	return (
		<div className='space-y-5 text-center'>
			<Card className='mt-4 w-full border-none'>
				<CardContent className='max-h-[500px] overflow-y-auto'>
					<div className='space-y-4'>
						{users
							.filter(
								(userItem: IUser) => userItem.id !== user.id
							)
							.map((userItem: IUser, index: number) => (
								<div
									key={index}
									className='flex items-center justify-between space-x-4'
								>
									<div className='flex items-center space-x-4'>
										{' '}
										<Avatar className='h-9 w-9 sm:flex'>
											<AvatarFallback>
												{userItem.displayName.slice(
													0,
													1
												)}
											</AvatarFallback>
										</Avatar>
										<div className='grid gap-1'>
											<p className='text-start text-sm font-medium leading-none'>
												{userItem.displayName}
											</p>
											<p className='text-sm text-muted-foreground'>
												{userItem.email},{' '}
												{userItem.role === 'ADMIN'
													? 'Администратор'
													: 'Сотрудник'}
											</p>
										</div>
									</div>
									<UserRoleButton user={userItem} />{' '}
								</div>
							))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
