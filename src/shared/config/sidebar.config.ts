import { Home, Inbox, Users } from 'lucide-react'

import { pageConfig } from './page.config'

export const sidebarItems = [
	{
		title: 'Профиль',
		url: pageConfig.dashboard.settings.profile,
		icon: Home
	},
	{
		title: 'Приглашение',
		url: pageConfig.dashboard.settings.invitation,
		icon: Inbox
	},
	{
		title: 'Пользователи',
		url: pageConfig.dashboard.settings.users,
		icon: Users
	}
]
