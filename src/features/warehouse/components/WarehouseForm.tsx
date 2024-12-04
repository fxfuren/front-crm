'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/shared/components/ui'

import {
	useAddItemOnWarehouseMutation,
	useGetItemsOnWarehouse,
	useUpdateItemMutation
} from '../hooks'
import { formSchema } from '../schemes'
import { IItem } from '../types'

type WarehouseFormValues = z.infer<typeof formSchema>

interface WarehouseFormProps {
	defaultValues?: Partial<IItem>
	onSubmit: (values: WarehouseFormValues) => void
}

export function WarehouseForm({ defaultValues, onSubmit }: WarehouseFormProps) {
	const { refetch } = useGetItemsOnWarehouse()

	const { addItem, isPending: isAdding } =
		useAddItemOnWarehouseMutation(refetch)
	const { updateItem, isPending: isUpdating } = useUpdateItemMutation(refetch)

	const form = useForm<WarehouseFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: defaultValues?.name || '',
			quantity: defaultValues?.quantity || 0,
			price: defaultValues?.price
		}
	})

	const handleSubmit = (values: WarehouseFormValues) => {
		const formattedValues = {
			...values,
			price: parseFloat(Number(values.price).toFixed(2)).toString()
		}

		if (defaultValues?.id) {
			updateItem({ ...formattedValues, id: defaultValues.id })
		} else {
			addItem(formattedValues)
		}
		onSubmit(formattedValues)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='space-y-8 p-4 md:p-0'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Товар</FormLabel>
							<FormControl>
								<Input
									placeholder='Введите название товара'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='quantity'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Количество</FormLabel>
							<FormControl>
								<Input
									{...field}
									disabled={isAdding || isUpdating}
									placeholder='Количество товара'
									type='text'
									onChange={e => {
										let value = e.target.value
										value = value.replace(/[^\d]/g, '')
										field.onChange(Number(value))
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='price'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Цена</FormLabel>
							<FormControl>
								<Input
									{...field}
									disabled={isAdding || isUpdating}
									placeholder='Цена товара'
									type='text'
									onChange={e => {
										let value = e.target.value
										const cursorPosition =
											e.target.selectionStart
										value = value.replace(/[^\d.]/g, '')
										const parts = value.split('.')
										if (parts.length > 1) {
											value = `${parts[0]}.${parts[1].slice(0, 1)}`
										}
										if (value.endsWith('.')) {
											value += '0'
										}
										if (/^\d+$/.test(value)) {
											value += '.0'
										}
										field.onChange(value)
										requestAnimationFrame(() => {
											e.target.selectionStart =
												e.target.selectionEnd =
													cursorPosition
										})
									}}
									value={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={isAdding || isUpdating}>
					{defaultValues ? 'Сохранить изменения' : 'Добавить элемент'}
				</Button>
			</form>
		</Form>
	)
}
