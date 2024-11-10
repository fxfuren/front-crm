import { MoveLeft } from 'lucide-react'
import Link from 'next/link'

import { SettignsSidebar } from '@/features/user/components'

import { Alert, SidebarProvider, buttonVariants } from '@/shared/components/ui'
import { pageConfig } from '@/shared/config'

export default function SettingsLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<SidebarProvider className='flex min-h-screen items-center justify-center'>
			<Alert className='flex h-[500px] w-full max-w-4xl overflow-hidden'>
				<SettignsSidebar />
				<main className='flex h-full w-full flex-1 flex-col overflow-hidden p-6'>
					<div className='flex flex-1 flex-col gap-4 overflow-y-auto'>
						<Link
							href={pageConfig.dashboard.main}
							className={buttonVariants()}
						>
							<MoveLeft />
							Dashboard
						</Link>
						{children}
					</div>
				</main>
			</Alert>
		</SidebarProvider>
	)
}
