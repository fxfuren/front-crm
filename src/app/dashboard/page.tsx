import { buttonVariants } from '@/shared/components/ui'
import { Settings2 } from 'lucide-react'
import Link from 'next/link'


export default function SettingsPage() {
	return (
		<div className='space-y-5 text-center'>
			<h1 className='text-4xl font-bold'>Dashboard</h1>
			<Link href='/dashboard/settings' className={buttonVariants()}>
				<Settings2 />
				Settings
			</Link>
		</div>
	)
}
