'use client'

import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import {
	DataTableColumnHeader,
	DataTableRowActions
} from '@/features/dashboard/components/data-table'
import { IUser } from '@/features/user/types'

import {
	Button,
	Checkbox,
	DatePicker,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/shared/components/ui'

import {
	useDeleteOrderMutation,
	useGetOrders,
	useUpdateOrderMutation
} from '../hooks'
import { IOrder, OrderStatus, statusIcons, statusLabels } from '../types'

export const orderColumns = (
	onEdit: (order: IOrder) => void
): ColumnDef<IOrder>[] => [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={value =>
					table.toggleAllPageRowsSelected(!!value)
				}
				aria-label='Выбрать все'
				className='translate-y-[2px]'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={value => row.toggleSelected(!!value)}
				aria-label='Выбрать строку'
				className='translate-y-[2px]'
			/>
		),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'id',
		header: 'ID',
		cell: ({ row }) => <div>{row.getValue('id')}</div>
	},
	{
		accessorKey: 'customer',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Клиент'
				searchable
				onSearch={value => column.setFilterValue(value)}
			/>
		),
		cell: ({ row }) => <div>{row.getValue('customer')}</div>,
		filterFn: (row, id, value) => {
			const searchValue = String(value).toLowerCase()
			const cellValue = String(row.getValue(id)).toLowerCase()
			return cellValue.includes(searchValue)
		}
	},
	{
		accessorKey: 'device',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Устройство'
				searchable
				onSearch={value => column.setFilterValue(value)}
			/>
		),
		cell: ({ row }) => <div>{row.getValue('device')}</div>,
		filterFn: (row, id, value) => {
			const searchValue = String(value).toLowerCase()
			const cellValue = String(row.getValue(id)).toLowerCase()
			return cellValue.includes(searchValue)
		}
	},
	{
		accessorKey: 'issue',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Проблема'
				searchable
				onSearch={value => column.setFilterValue(value)}
			/>
		),
		cell: ({ row }) => {
			const issue = row.getValue<string>('issue')

			return issue.length > 15 ? (
				<Popover>
					<PopoverTrigger className='max-w-[150px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap'>
						{issue.substring(0, 10)}...
					</PopoverTrigger>
					<PopoverContent>{issue}</PopoverContent>
				</Popover>
			) : (
				<div>{issue}</div>
			)
		},
		filterFn: (row, id, value) => {
			const searchValue = String(value).toLowerCase()
			const cellValue = String(row.getValue(id)).toLowerCase()
			return cellValue.includes(searchValue)
		}
	},
	{
		accessorKey: 'technician',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Техник' />
		),
		cell: ({ row }) => {
			const technician = row.getValue('technician') as IUser
			return <div>{technician.displayName}</div>
		}
	},
	{
		accessorKey: 'status',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Статус' />
		),
		cell: ({ row }) => {
			const status: OrderStatus = row.getValue('status')
			const localizedStatus = statusLabels[status]
			const Icon = statusIcons[status]
			const orderId = row.getValue('id')
			const { refetch } = useGetOrders()
			const { updateOrder } = useUpdateOrderMutation(() => refetch())

			const handleStatusChange = (newStatus: OrderStatus) => {
				updateOrder({
					id: orderId,
					status: newStatus
				})
			}

			return (
				<div className='flex items-center space-x-2'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline' size='sm'>
								{Icon && (
									<Icon className='h-4 w-4 text-muted-foreground' />
								)}
								<span>{localizedStatus}</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='w-[150px]'>
							<DropdownMenuLabel>
								Выберите новый статус
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{Object.keys(OrderStatus).map(statusKey => {
								const statusOption =
									OrderStatus[
										statusKey as keyof typeof OrderStatus
									]
								const StatusIcon = statusIcons[statusOption]
								return (
									<DropdownMenuItem
										key={statusOption}
										onClick={() =>
											handleStatusChange(statusOption)
										}
										className='flex items-center space-x-2'
									>
										{StatusIcon && (
											<StatusIcon className='h-4 w-4 text-muted-foreground' />
										)}
										<span>
											{statusLabels[statusOption]}
										</span>
									</DropdownMenuItem>
								)
							})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)
		}
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Дата создания' />
		),
		cell: ({ row }) => {
			const createdAt = row.getValue('createdAt')
			return createdAt &&
				(typeof createdAt === 'string' ||
					typeof createdAt === 'number' ||
					createdAt instanceof Date) &&
				!isNaN(new Date(createdAt).getTime()) ? (
				<div>{format(new Date(createdAt), 'dd/MM/yyyy')}</div>
			) : (
				<div>Дата не указана</div>
			)
		}
	},
	{
		accessorKey: 'completedAt',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Дата завершения' />
		),
		cell: ({ row }) => {
			const completedAt = row.getValue('completedAt')
			const orderId = row.getValue('id')
			const { refetch } = useGetOrders()

			const { updateOrder, isPending } = useUpdateOrderMutation(() =>
				refetch()
			)
			const handleDateChange = (newDate: Date) => {
				if (newDate) {
					updateOrder({
						id: orderId,
						completedAt: newDate
					})
				}
			}

			return (
				<Popover>
					<PopoverTrigger asChild>
						<Button variant='outline'>
							<CalendarIcon className='w- h-4' />
							{completedAt &&
							(typeof completedAt === 'string' ||
								typeof completedAt === 'number' ||
								completedAt instanceof Date) &&
							!isNaN(new Date(completedAt).getTime()) ? (
								<div>
									{format(
										new Date(completedAt),
										'dd/MM/yyyy'
									)}
								</div>
							) : (
								<div>Не завершено</div>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						<DatePicker
							currentDate={completedAt}
							onDateChange={handleDateChange}
						/>
					</PopoverContent>
				</Popover>
			)
		}
	},
	{
		accessorKey: 'price',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Цена' />
		),
		cell: ({ row }) => {
			const status: OrderStatus = row.getValue('status')
			if (
				status === OrderStatus.Completed ||
				status === OrderStatus.Canceled
			) {
				return <div>{row.getValue('price')}</div>
			}
			return <div>Заказ не выполнен</div>
		},
		filterFn: (row, id, value) => {
			const searchValue = String(value).toLowerCase()
			const cellValue = String(row.getValue(id)).toLowerCase()
			return cellValue.includes(searchValue)
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const order = row.original
			const { refetch } = useGetOrders()
			const { deleteOrder } = useDeleteOrderMutation(refetch)

			return (
				<DataTableRowActions
					id={order.id}
					onEdit={() => onEdit(order)}
					onDelete={() => deleteOrder(order.id)}
				/>
			)
		}
	}
]
