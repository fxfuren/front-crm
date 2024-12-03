import { z } from 'zod'

export const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Название должно быть не менее 2 символов.'
	}),
	quantity: z.number().min(1, {
		message: 'Количество должно быть не менее 1.'
	}),
	price: z
		.string()
		.refine(value => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
			message: 'Цена должна быть числом больше нуля.'
		})
})
