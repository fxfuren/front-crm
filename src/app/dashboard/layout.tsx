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
			<SidebarInset>
				<header className='flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
					<SidebarTrigger className='-ml-1' />
					<Separator orientation='vertical' className='mr-2 h-4' />
					<BreadcrumbNavbar />
				</header>
				<div className='flex flex-1 flex-col items-center justify-center gap-4 p-4 px-4 pt-0'>
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
