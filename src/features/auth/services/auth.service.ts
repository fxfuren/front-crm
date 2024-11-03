import { api } from '@/shared/api'

import type { TypeLoginSchema, TypeRegisterSchema } from '../schemes'
import type { IAuthResponse } from '../types'

/**
 * Сервис для работы с аутентификацией.
 */
class AuthService {
	/**
	 * Регистрация нового пользователя.
	 *
	 * @param {TypeRegisterSchema} body - Данные для регистрации.
	 * @param {string} [recaptcha] - Токен reCAPTCHA (опционально).
	 * @returns {Promise<IAuthResponse>} - Ответ с данными пользователя.
	 */
	public async register(body: TypeRegisterSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IAuthResponse>('auth/register', body, {
			headers
		})

		return response
	}

	/**
	 * Вход пользователя в систему.
	 *
	 * @param {TypeLoginSchema} body - Данные для входа.
	 * @param {string} [recaptcha] - Токен reCAPTCHA (опционально).
	 * @returns {Promise<IAuthResponse>} - Ответ с данными пользователя.
	 */
	public async login(body: TypeLoginSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IAuthResponse>('auth/login', body, {
			headers
		})

		return response
	}

	/**
	 * Выход пользователя из системы.
	 *
	 * @returns {Promise<void>} - Ответ от сервера.
	 */
	public async logout() {
		const response = await api.post('auth/logout')

		return response
	}
}

export const authService = new AuthService()
