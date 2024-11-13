'use client'

import { Braces, Home, Package, ShoppingBag } from 'lucide-react'
import * as React from 'react'

import { pageConfig } from '@/shared/config'
import { useProfile } from '@/shared/hooks'

import { NavUser } from '../../../features/user/components/NavUser'

import { NavMain } from './NavMain'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail
} from './Sidebar'

const data = {
	navMain: [
		{
			title: 'Главная',
			url: pageConfig.dashboard.home,
			icon: Home,
			isActive: true
		},
		{
			title: 'Заказы',
			url: pageConfig.dashboard.orders,
			icon: ShoppingBag
		},
		{
			title: 'Склад',
			url: pageConfig.dashboard.warehouse,
			icon: Package
		}
	]
}

export function DasboardSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const { user, isLoading } = useProfile()
	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader>
				<Braces />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user!} isLoading={isLoading} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
