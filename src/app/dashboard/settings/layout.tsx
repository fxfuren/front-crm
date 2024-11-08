import { MoveLeft } from 'lucide-react'
import Link from 'next/link'

import { SettignsSidebar } from '@/features/user/components'

import { SidebarProvider, buttonVariants } from '@/shared/components/ui'

export default function SettingsLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<SidebarProvider className='flex min-h-screen items-center justify-center'>
			<div className='flex h-[500px] w-full max-w-4xl overflow-hidden rounded-lg shadow-lg'>
				<SettignsSidebar />
				<main className='flex h-full w-full flex-1 flex-col overflow-hidden p-6'>
					<div className='flex flex-1 flex-col gap-4 overflow-y-auto'>
						<Link href='/dashboard' className={buttonVariants()}>
							<MoveLeft />
							Dashboard
						</Link>
						{children}
					</div>
				</main>
			</div>
		</SidebarProvider>
	)
}
