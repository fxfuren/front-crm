/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		// URL сервера для API-запросов, получаемый из переменных окружения
		SERVER_URL: process.env.SERVER_URL,
		// Ключ сайта Google reCAPTCHA для клиентской валидации
		GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY
	}
}

export default nextConfig
