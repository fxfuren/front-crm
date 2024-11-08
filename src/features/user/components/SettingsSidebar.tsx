import { Home, Inbox } from 'lucide-react'
import Link from 'next/link'

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/shared/components/ui'

const items = [
	{
		title: 'Профиль',
		url: '/dashboard/settings/profile',
		icon: Home
	},
	{
		title: 'Приглашение',
		url: '/dashboard/settings/invitation',
		icon: Inbox
	}
]

export function SettignsSidebar() {
	return (
		<Sidebar collapsible='none' className='hidden min-h-screen md:flex'>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map(item => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
