import { EllipsisVertical, LogOutIcon } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Skeleton
} from '@/shared/components/ui'

import { useUpdateRoleMutation } from '../hooks'
import type { IUser } from '../types'
import { UserRole } from '../types'

interface UserRoleButtonProps {
	user: IUser
}

/**
 * Кнопка пользователя с выпадающим меню.
 *
 * @param {UserRoleButtonProps} props - Свойства компонента, включая данные пользователя.
 */
export function UserRoleButton({ user }: UserRoleButtonProps) {
	const { update, isLoadingUpdate } = useUpdateRoleMutation()

	if (!user) return null

	const handleRoleChange = (newRole: UserRole) => {
		update({ userId: user.id, role: { role: newRole } })
	}

	if (!user) return null

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<EllipsisVertical />
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-40' align='end'>
				{user.role !== UserRole.Admin && (
					<DropdownMenuItem
						disabled={isLoadingUpdate}
						onClick={() => handleRoleChange(UserRole.Admin)}
					>
						<LogOutIcon className='mr-2 size-4' />
						Сменить на Администратора
					</DropdownMenuItem>
				)}
				{user.role !== UserRole.Regular && (
					<DropdownMenuItem
						disabled={isLoadingUpdate}
						onClick={() => handleRoleChange(UserRole.Regular)}
					>
						<LogOutIcon className='mr-2 size-4' />
						Сменить на Сотрудника
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export function UserRoleButtonLoading() {
	return <Skeleton className='size-10 rounded-full' />
}
