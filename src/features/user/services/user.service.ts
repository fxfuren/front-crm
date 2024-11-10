import { api } from '@/shared/api'

import type { TypeSettingsSchema } from '../schemes'
import { IUser } from '../types'

/**
 * Сервис для работы с пользователями.
 */
class UserService {
	/**
	 * Получает профиль текущего пользователя.
	 *
	 * @returns {Promise<IUser>} - Профиль пользователя.
	 */
	public async findProfile() {
		const response = await api.get<IUser>('users/profile')

		return response
	}

	/**
	 * Обновляет профиль текущего пользователя.
	 *
	 * @param {TypeSettingsSchema} body - Данные для обновления профиля.
	 * @returns {Promise<IUser>} - Обновленный профиль пользователя.
	 */
	public async updateProfile(body: TypeSettingsSchema) {
		const response = await api.patch<IUser>('users/profile', body)

		return response
	}

	/**
	 * Генерирует ссылку приглашения для регистрации.
	 *
	 * @returns {Promise<IUser>} - Обновленный профиль пользователя.
	 */
	public async generateInviteToken() {
		const response = await api.post<IUser>('users/new')

		return response
	}

	/**
	 * Получает все инвайт токены текущего пользователя.
	 *
	 * @returns {Promise<any[]>} - Массив инвайт токенов.
	 */
	public async getInviteTokens() {
		const response = await api.get<any[]>('users/invite-tokens')
		return response
	}
}

export const userService = new UserService()
