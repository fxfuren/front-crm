import { MobileSidebar, SettignsSidebar } from '@/features/user/components'

import { Alert, SidebarProvider } from '@/shared/components/ui'

export default function SettingsLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<SidebarProvider className='flex items-center justify-center'>
			<Alert className='flex h-[500px] w-full max-w-4xl flex-col overflow-hidden md:flex-row'>
				<div className='w-full md:hidden'>
					<MobileSidebar />
				</div>
				<div className='hidden w-[300px] md:flex'>
					<SettignsSidebar />
				</div>
				<main className='flex h-full w-full flex-1 flex-col overflow-hidden p-1'>
					<div className='flex flex-1 flex-col gap-4 overflow-y-auto'>
						{children}
					</div>
				</main>
			</Alert>
		</SidebarProvider>
	)
}
