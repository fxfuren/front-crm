'use client'

import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { CheckCircle, Circle, CircleOff, Timer } from 'lucide-react'

import {
	DataTableColumnHeader,
	DataTableRowActions
} from '@/features/dashboard/components/data-table'

import { Checkbox } from '@/shared/components/ui'

import { IOrder, OrderStatus } from '../types'

export const statusIcons = {
	[OrderStatus.InProgress]: Timer,
	[OrderStatus.Completed]: CheckCircle,
	[OrderStatus.Pending]: Circle,
	[OrderStatus.Canceled]: CircleOff
}

export const orderColumns: ColumnDef<IOrder>[] = [
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
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='ID' />
		),
		cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>
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
		cell: ({ row }) => <div>{row.getValue('issue')}</div>,
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
			const technician = row.getValue('technician')
			return technician ? (
				<div>{technician.displayName}</div>
			) : (
				<div>Нет техника</div>
			)
		}
	},
	{
		accessorKey: 'status',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Статус' />
		),
		cell: ({ row }) => {
			const status: OrderStatus = row.getValue('status')
			const Icon = statusIcons[status]

			return (
				<div className='flex items-center space-x-2'>
					{Icon && <Icon className='h-4 w-4 text-muted-foreground' />}
					<span>{status}</span>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
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
			return completedAt &&
				(typeof completedAt === 'string' ||
					typeof completedAt === 'number' ||
					completedAt instanceof Date) &&
				!isNaN(new Date(completedAt).getTime()) ? (
				<div>{format(new Date(completedAt), 'dd/MM/yyyy')}</div>
			) : (
				<div>Не завершено</div>
			)
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => <DataTableRowActions />
	}
]
