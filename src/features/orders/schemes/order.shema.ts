import { z } from 'zod'

export const formSchema = z.object({
	customer: z.string().min(2, {
		message: 'Имя клиента должно быть не менее 2 символов.'
	}),
	device: z.string().min(2, {
		message: 'Устройство должно быть не менее 2 символов.'
	}),
	issue: z.string().min(5, {
		message: 'Описание проблемы должно быть не менее 5 символов.'
	}),
	price: z
		.string()
		.optional()
		.refine(value => /^\d+(\.\d{1,2})?$/.test(value), {
			message:
				'Цена должна быть числом с не более чем 2 десятичными знаками.'
		})
})
