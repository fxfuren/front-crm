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
	price: z.union([z.string().optional(), z.null()])
})
