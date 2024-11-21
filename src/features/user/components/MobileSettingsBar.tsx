'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { sidebarItems } from '@/shared/config'

export function MobileSidebar() {
	const pathname = usePathname()

	return (
		<div className='flex justify-center space-x-4 py-4 md:hidden'>
			{sidebarItems.map(item => (
				<Link
					key={item.title}
					href={item.url}
					className={`flex items-center space-x-2 ${pathname === item.url ? 'text-blue-600' : ''}`}
				>
					{React.createElement(item.icon)}
					<span>{item.title}</span>
				</Link>
			))}
		</div>
	)
}
