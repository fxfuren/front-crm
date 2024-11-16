import {
	BreadcrumbNavbar,
	DasboardSidebar
} from '@/features/dashboard/components'

import {
	Separator,
	SidebarInset,
	SidebarProvider,
	SidebarTrigger
} from '@/shared/components/ui'

export default function DashboardLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<SidebarProvider>
			<DasboardSidebar />
			<SidebarInset className='overflow-hidden'>
				<header className='flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
					<SidebarTrigger className='-ml-1' />
					<Separator orientation='vertical' className='mr-2 h-4' />
					<BreadcrumbNavbar />
				</header>
				<div className='mx-auto flex w-full flex-1 flex-col md:p-6'>
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
