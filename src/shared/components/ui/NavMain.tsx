'use client'

import { type LucideIcon } from 'lucide-react'
import Link from 'next/link'

import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from './Sidebar'

export function NavMain({
	items
}: {
	items: {
		title: string
		url: string
		icon?: LucideIcon
		isActive?: boolean
	}[]
}) {
	return (
		<SidebarGroup>
			<SidebarMenu>
				{items.map(item => (
					<SidebarMenuItem key={item.title}>
						<Link href={item.url} passHref>
							<SidebarMenuButton tooltip={item.title}>
								{item.icon && <item.icon />}
								<span>{item.title}</span>
							</SidebarMenuButton>
						</Link>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	)
}
