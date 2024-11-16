'use client'

import { ChevronsUpDown, LogOutIcon, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { IUser } from '@/features/user/types'

import { Skeleton } from '@/shared/components/ui'
import { ToggleTheme } from '@/shared/components/ui/ToggleTheme'
import { pageConfig } from '@/shared/config'

import { Avatar, AvatarFallback } from '../../../shared/components/ui/Avatar'
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar
} from '../../../shared/components/ui/Sidebar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '../../../shared/components/ui/dropdown-menu'
import { useLogoutMutation } from '../hooks'

export function NavUser({
	user,
	isLoading
}: {
	user?: IUser
	isLoading: boolean
}) {
	const { isMobile } = useSidebar()
	const { logout, isLoadingLogout } = useLogoutMutation()
	const navigate = useRouter()

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
						>
							{isLoading ? (
								<div className='flex items-center space-x-4'>
									<Skeleton className='size-8 rounded-full' />
									<div className='space-y-2'>
										<Skeleton className='h-3 w-[100px]' />
										<Skeleton className='h-3 w-[250px]' />
									</div>
								</div>
							) : (
								<>
									<Avatar className='h-8 w-8 rounded-lg'>
										<AvatarFallback>
											{user?.displayName.slice(0, 1)}
										</AvatarFallback>
									</Avatar>
									<div className='grid flex-1 text-left text-sm leading-tight'>
										<span className='truncate font-semibold'>
											{user?.displayName}
										</span>
										<span className='truncate text-xs'>
											{user?.email}
										</span>
									</div>
									<ChevronsUpDown className='ml-auto size-4' />
								</>
							)}
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
						side={isMobile ? 'bottom' : 'right'}
						align='end'
						sideOffset={4}
					>
						<DropdownMenuLabel className='p-0 font-normal'>
							<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
								<Avatar className='h-8 w-8 rounded-lg'>
									<AvatarFallback>
										{user?.displayName.slice(0, 1)}
									</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-semibold'>
										{user?.displayName}
									</span>
									<span className='truncate text-xs'>
										{user?.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>

						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<ToggleTheme asButton />
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() =>
								navigate.push(
									pageConfig.dashboard.settings.main
								)
							}
						>
							<Settings className='mr-2 size-4' />
							Настройки
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							disabled={isLoadingLogout}
							onClick={() => logout()}
						>
							<LogOutIcon className='mr-2 size-4' />
							Выйти
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
