import { SettingsForm } from '@/features/user/components'
import { buttonVariants } from '@/shared/components/ui'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'


export default function SettingsPage() {
	return (
		<div className='space-y-5 text-center'>
			<Link href='/dashboard' className={buttonVariants()}>
				<MoveLeft />
				Dashboard
			</Link>
			<SettingsForm />
		</div>
	)
}
