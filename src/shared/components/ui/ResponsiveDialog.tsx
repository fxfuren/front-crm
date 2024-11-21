import { Plus } from 'lucide-react'
import * as React from 'react'

import { useMediaQuery } from '@/shared/hooks'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from './Dialog'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from './Drawer'
import { Button } from './button'

interface DrawerDialogProps {
	children: React.ReactNode
	title: string
	description: string
	triggerButtonClassName?: string
}

export function ResponsiveDialog({
	children,
	title,
	description,
	triggerButtonClassName = 'fixed bottom-8 right-8 shadow-lg'
}: DrawerDialogProps) {
	const [open, setOpen] = React.useState(false)
	const isDesktop = useMediaQuery('(min-width: 768px)')

	const sharedTrigger = (
		<Button
			size='icon'
			variant='outline'
			onClick={() => setOpen(true)}
			className={triggerButtonClassName}
		>
			<Plus />
		</Button>
	)

	return isDesktop ? (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{sharedTrigger}</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	) : (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{sharedTrigger}</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className='text-left'>
					<DrawerTitle>{title}</DrawerTitle>
					<DrawerDescription>{description}</DrawerDescription>
				</DrawerHeader>
				{children}
				<DrawerFooter className='pt-2'>
					<DrawerClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
