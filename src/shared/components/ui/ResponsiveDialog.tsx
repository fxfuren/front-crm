import { Plus } from 'lucide-react'
import * as React from 'react'

import { useMediaQuery } from '@/shared/hooks'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from './Dialog'
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle
} from './Drawer'
import { Button } from './button'

interface DrawerDialogProps {
	children: React.ReactNode
	title: string
	description: string
	isOpen: boolean
	onClose: () => void
	triggerButtonClassName?: string
	onOpen: () => void
}

export function ResponsiveDialog({
	children,
	title,
	description,
	isOpen,
	onClose,
	triggerButtonClassName = 'fixed bottom-8 right-8 shadow-lg',
	onOpen
}: DrawerDialogProps) {
	const isDesktop = useMediaQuery('(min-width: 768px)')

	return (
		<>
			<Button
				size='icon'
				variant='outline'
				onClick={onOpen}
				className={triggerButtonClassName}
			>
				<Plus />
			</Button>

			{isDesktop ? (
				<Dialog open={isOpen} onOpenChange={onClose}>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<DialogTitle>{title}</DialogTitle>
							<DialogDescription>{description}</DialogDescription>
						</DialogHeader>
						{children}
					</DialogContent>
				</Dialog>
			) : (
				<Drawer open={isOpen} onOpenChange={onClose}>
					<DrawerContent>
						<DrawerHeader className='text-left'>
							<DrawerTitle>{title}</DrawerTitle>
							<DrawerDescription>{description}</DrawerDescription>
						</DrawerHeader>
						{children}
					</DrawerContent>
				</Drawer>
			)}
		</>
	)
}
