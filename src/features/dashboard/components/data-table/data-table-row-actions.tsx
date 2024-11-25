'use client'

import { MoreHorizontal } from 'lucide-react'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger
} from '@/shared/components/ui'

type DataTableRowActionsProps<TData> = {
	id: string
	onEdit: () => void
	onDelete: (id: string) => void
}

export function DataTableRowActions<TData>({
	id,
	onEdit,
	onDelete
}: DataTableRowActionsProps<TData>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
				>
					<MoreHorizontal />
					<span className='sr-only'>Открыть меню</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-[160px]'>
				<DropdownMenuItem
					onClick={e => {
						e.stopPropagation()
						onEdit()
					}}
				>
					Редактировать
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={e => {
						e.stopPropagation()
						onDelete(id)
					}}
				>
					Удалить
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
