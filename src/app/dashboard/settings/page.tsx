import { buttonVariants } from '@/shared/components/ui'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'


export default function SettingsPage() {
	return (
		<div className='space-y-5 text-center'>
			<h1 className='text-4xl font-bold'>Setttigs</h1>
			<Link href='/dashboard' className={buttonVariants()}>
				<MoveLeft />
				Dashboard
			</Link>
		</div>
	)
}
