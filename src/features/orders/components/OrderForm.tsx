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
	Input,
	Textarea
} from '@/shared/components/ui'
import { useProfile } from '@/shared/hooks'

import {
	useAddOrderMutation,
	useGetOrders,
	useUpdateOrderMutation
} from '../hooks'
import { formSchema } from '../schemes'

type OrderFormValues = z.infer<typeof formSchema>

export function OrderForm({
	defaultValues,
	onSubmit
}: {
	defaultValues?: OrderFormValues
	onSubmit?: () => void
}) {
	const { user, isLoading: isLoadingProfile } = useProfile()
	const { refetch } = useGetOrders()
	const technicianId = user?.id as string

	const { addOrder, isPending: isPendingAdd } = useAddOrderMutation(
		technicianId,
		refetch
	)
	const { updateOrder, isPending: isPendingUpdate } =
		useUpdateOrderMutation(refetch)

	const form = useForm<OrderFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues || {
			customer: '',
			device: '',
			issue: ''
		}
	})

	const handleSubmit = (values: OrderFormValues) => {
		if (defaultValues) {
			updateOrder({
				id: defaultValues.id,
				...values
			})
		} else {
			addOrder({
				...values,
				technicianId
			})
		}

		onSubmit?.()
	}

	if (isLoadingProfile) {
		return <div>Загрузка данных...</div>
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className='space-y-8 p-4 md:p-0'
			>
				<FormField
					control={form.control}
					name='customer'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Клиент</FormLabel>
							<FormControl>
								<Input
									placeholder='Введите имя клиента'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='device'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Устройство</FormLabel>
							<FormControl>
								<Input
									placeholder='Введите название устройства'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='issue'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Описание проблемы</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Опишите проблему'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type='submit'
					disabled={isPendingAdd || isPendingUpdate}
				>
					{defaultValues ? 'Сохранить изменения' : 'Добавить'}
				</Button>
			</form>
		</Form>
	)
}
