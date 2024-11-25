'use client'

import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import {
	DataTableColumnHeader,
	DataTableRowActions
} from '@/features/dashboard/components/data-table'

import { Checkbox } from '@/shared/components/ui'

import {
	useDeleteItemFromWarehouseMutation,
	useGetItemsOnWarehouse
} from '../hooks'
import { IItem } from '../types'

export const itemColumns: ColumnDef<IItem>[] = [
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
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Название товара'
				searchable
				onSearch={value => column.setFilterValue(value)}
			/>
		),
		cell: ({ row }) => <div>{row.getValue('name')}</div>,
		filterFn: (row, id, value) => {
			const searchValue = String(value).toLowerCase()
			const cellValue = String(row.getValue(id)).toLowerCase()
			return cellValue.includes(searchValue)
		}
	},
	{
		accessorKey: 'quantity',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Количество'
				searchable
				onSearch={value => column.setFilterValue(value)}
			/>
		),
		cell: ({ row }) => <div>{row.getValue('quantity')}</div>,
		filterFn: (row, id, value) => {
			const searchValue = String(value).toLowerCase()
			const cellValue = String(row.getValue(id)).toLowerCase()
			return cellValue.includes(searchValue)
		}
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Дата добавления' />
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
		id: 'actions',
		cell: ({ row }) => {
			const { refetch } = useGetItemsOnWarehouse()
			const { deleteItem } = useDeleteItemFromWarehouseMutation(refetch)
			const itemId = row.getValue('id')
			return <DataTableRowActions id={itemId} onDelete={deleteItem} />
		}
	}
]
