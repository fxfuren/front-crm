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

import { useGetItemsOnWarehouse } from '../hooks'
import { useAddItemOnWarehouseMutation } from '../hooks/useAddItemFromWarehouseMutation'
import { formSchema } from '../schemes'

type WarehouseFormValues = z.infer<typeof formSchema>

export function WarehouseForm() {
	const { refetch } = useGetItemsOnWarehouse()

	const { addItem, isPending } = useAddItemOnWarehouseMutation(refetch)

	const form = useForm<WarehouseFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			quantity: 0
		}
	})

	const onSubmit = (values: WarehouseFormValues) => {
		addItem({
			...values
		})
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
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
									disabled={isPending}
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
				<Button type='submit' disabled={isPending}>
					Сохранить
				</Button>
			</form>
		</Form>
	)
}
