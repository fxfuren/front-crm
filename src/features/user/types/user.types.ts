/**
 * Роли пользователя в системе.
 */
export enum UserRole {
	Regular = 'REGULAR',
	Admin = 'ADMIN'
}

/**
 * Интерфейс для пользователя.
 */
export interface IUser {
	id: string
	createdAt: Date
	updatedAt: Date
	email: string
	password: string
	displayName: string
	role: UserRole
	isVerified: boolean
}
