import { Settings2 } from 'lucide-react'
import Link from 'next/link'

import { buttonVariants } from '@/shared/components/ui'
import { pageConfig } from '@/shared/config'

export default function SettingsPage() {
	return (
		<div className='space-y-5 text-center'>
			<h1 className='text-4xl font-bold'>Dashboard</h1>
			<Link
				href={pageConfig.dashboard.settings.main}
				className={buttonVariants()}
			>
				<Settings2 />
				Settings
			</Link>
		</div>
	)
}
