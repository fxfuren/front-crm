import { z } from 'zod'

export const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Название должно быть не менее 2 символов.'
	}),
	quantity: z.number().min(1, {
		message: 'Количество должно быть не менее 1.'
	}),
	description: z
		.string()
		.min(5, {
			message: 'Описание проблемы должно быть не менее 5 символов.'
		})
		.optional(),
	price: z.string().refine(value => /^\d+(\.\d{1,2})?$/.test(value), {
		message: 'Цена должна быть числом с не более чем 2 десятичными знаками.'
	})
})
