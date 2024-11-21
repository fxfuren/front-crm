'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@/shared/components/ui'

const pathTranslations: {
	[key: string]: string
} = {
	home: 'Главная',
	orders: 'Заказы',
	clients: 'Клиенты',
	settings: 'Настройки',
	profile: 'Профиль',
	invitation: 'Приглашение',
	users: 'Пользователи',
	dashboard: 'Панель управления',
	warehouse: 'Склад'
}

export function BreadcrumbNavbar() {
	const pathname = usePathname()
	const pathSegments = pathname.split('/').filter(Boolean)

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{pathSegments.map((segment, index) => (
					<React.Fragment key={index}>
						{index > 0 && <BreadcrumbSeparator />}
						<BreadcrumbItem>
							{index < pathSegments.length - 1 ? (
								<Link
									href={`/${pathSegments.slice(0, index + 1).join('/')}`}
								>
									{pathTranslations[segment] || segment}
								</Link>
							) : (
								<BreadcrumbPage>
									{pathTranslations[segment] || segment}
								</BreadcrumbPage>
							)}
						</BreadcrumbItem>
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
