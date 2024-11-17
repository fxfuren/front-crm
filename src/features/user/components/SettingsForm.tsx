'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Loading
} from '@/shared/components/ui'
import { useProfile } from '@/shared/hooks'

import { useUpdateProfileMutation } from '../hooks'
import { SettingsSchema, type TypeSettingsSchema } from '../schemes'

/**
 * Форма для настройки профиля пользователя.
 */
export function SettingsForm() {
	const { user, isLoading } = useProfile()

	const form = useForm<TypeSettingsSchema>({
		resolver: zodResolver(SettingsSchema),
		values: {
			name: user?.displayName || '',
			email: user?.email || ''
		}
	})

	const { update, isLoadingUpdate } = useUpdateProfileMutation()

	const onSubmit = (values: TypeSettingsSchema) => {
		update({ values })
	}

	if (isLoading) {
		return (
			<Card>
				<CardHeader className='flex flex-row items-center justify-between'>
					<CardTitle>Настройки профиля</CardTitle>
				</CardHeader>
				<CardContent>
					<Loading />
				</CardContent>
			</Card>
		)
	}

	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between'>
				<CardTitle>Настройки профиля</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='grid gap-2 space-y-2'
					>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Имя</FormLabel>
									<FormControl>
										<Input
											placeholder='Иван'
											disabled={isLoadingUpdate}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Почта</FormLabel>
									<FormControl>
										<Input
											placeholder='ivan@example.com'
											disabled={isLoadingUpdate}
											type='email'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' disabled={isLoadingUpdate}>
							Сохранить
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
