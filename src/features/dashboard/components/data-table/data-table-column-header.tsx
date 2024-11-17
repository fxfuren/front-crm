import { Column } from '@tanstack/react-table'
import {
	ArrowDown,
	ArrowUp,
	ChevronsUpDown,
	EyeOff,
	Search
} from 'lucide-react'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Input
} from '@/shared/components/ui'
import { cn } from '@/shared/utils'

interface DataTableColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>
	title: string
	searchable?: boolean
	onSearch?: (value: string) => void
}

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	className,
	searchable = false,
	onSearch
}: DataTableColumnHeaderProps<TData, TValue>) {
	return (
		<div className={cn('flex items-center space-x-2', className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						size='sm'
						className='-ml-3 h-8 data-[state=open]:bg-accent'
					>
						<span>{title}</span>
						{searchable && onSearch ? (
							<div className='flex items-center space-x-2'>
								<Search className='h-4 w-4' />
								{column.getIsSorted() === 'desc' ? (
									<ArrowDown className='h-4 w-4' />
								) : column.getIsSorted() === 'asc' ? (
									<ArrowUp className='h-4 w-4' />
								) : (
									<ChevronsUpDown className='h-4 w-4' />
								)}
							</div>
						) : column.getIsSorted() === 'desc' ? (
							<ArrowDown />
						) : column.getIsSorted() === 'asc' ? (
							<ArrowUp />
						) : (
							<ChevronsUpDown />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='start'>
					{searchable && onSearch && (
						<div className='p-2'>
							<Input
								type='text'
								placeholder={`Поиск`}
								className='h-8 w-40'
								onChange={e => onSearch(e.target.value)}
							/>
						</div>
					)}
					<DropdownMenuItem
						onClick={() => column.toggleSorting(false)}
					>
						<ArrowUp className='h-3.5 w-3.5 text-muted-foreground/70' />
						По возрастанию
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => column.toggleSorting(true)}
					>
						<ArrowDown className='h-3.5 w-3.5 text-muted-foreground/70' />
						По убыванию
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => column.toggleVisibility(false)}
					>
						<EyeOff className='h-3.5 w-3.5 text-muted-foreground/70' />
						Скрыть
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
