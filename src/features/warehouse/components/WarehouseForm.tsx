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
			quantity: defaultValues?.quantity || 0
		}
	})

	const handleSubmit = (values: WarehouseFormValues) => {
		if (defaultValues?.id) {
			updateItem({ ...values, id: defaultValues.id })
		} else {
			addItem(values)
		}
		onSubmit(values)
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
				<Button type='submit' disabled={isAdding || isUpdating}>
					{defaultValues ? 'Сохранить изменения' : 'Добавить элемент'}
				</Button>
			</form>
		</Form>
	)
}
