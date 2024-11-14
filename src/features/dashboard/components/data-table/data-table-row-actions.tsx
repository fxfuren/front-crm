'use client'

import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from '@/shared/components/ui'

import { labels } from '../../data/data'
import { taskSchema } from '../../data/schema'

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

export function DataTableRowActions<TData>({
	row
}: DataTableRowActionsProps<TData>) {
	const task = taskSchema.parse(row.original)

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
				<DropdownMenuItem>Редактировать</DropdownMenuItem>
				<DropdownMenuItem>Сделать копию</DropdownMenuItem>
				<DropdownMenuItem>Добавить в избранное</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Метки</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuRadioGroup value={task.label}>
							{labels.map(label => (
								<DropdownMenuRadioItem
									key={label.value}
									value={label.value}
								>
									{label.label}
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Удалить
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
