import { z } from 'zod'

export const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Название должно быть не менее 2 символов.'
	}),
	quantity: z.number().min(1, {
		message: 'Количество должно быть не менее 1.'
	})
})
