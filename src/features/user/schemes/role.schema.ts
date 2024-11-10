import { z } from 'zod'

import { UserRole } from '../types'

/**
 * Схема для валидации и типизации данных обновления роли пользователя.
 */
export const UpdateRoleSchema = z.object({
	role: z.enum([UserRole.Admin, UserRole.Regular], {
		message: 'Некорректная роль'
	})
})

/**
 * Тип данных обновления роли пользователя, выведенный из схемы.
 */
export type TypeUpdateRoleSchema = z.infer<typeof UpdateRoleSchema>
