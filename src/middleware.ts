import { type NextRequest, NextResponse } from 'next/server'

import { pageConfig } from './shared/config'

/**
 * Основной middleware для обработки редиректов и авторизации.
 *
 * @param request - Запрос, который поступает в middleware.
 * @returns Response - Ответ для перенаправления или продолжения запроса.
 */
export default function middleware(request: NextRequest) {
	// Извлекаем путь и сессию из запроса
	const { pathname } = request.nextUrl
	const session = request.cookies.get('session')?.value

	/**
	 * Маппинг маршрутов для обработки редиректов.
	 * Ключи — это маршруты, которые должны быть обработаны,
	 * а значения — функции, выполняющие редиректы.
	 */
	const redirects: { [key: string]: () => NextResponse | null } = {
		'/': () =>
			NextResponse.redirect(
				new URL(pageConfig.dashboard.settings.main, request.url)
			),
		[pageConfig.dashboard.main]: () =>
			NextResponse.redirect(
				new URL(pageConfig.dashboard.home, request.url)
			),
		[pageConfig.auth.main]: () =>
			session
				? NextResponse.redirect(
						new URL(pageConfig.dashboard.settings.main, request.url)
					)
				: null
	}

	if (redirects[pathname]) {
		const result = redirects[pathname]()
		if (result) return result
	}
	if (pathname.startsWith(pageConfig.auth.main)) {
		if (session) {
			return NextResponse.redirect(
				new URL(pageConfig.dashboard.settings.main, request.url)
			)
		}
		return NextResponse.next()
	}
	if (pathname.startsWith(pageConfig.dashboard.main)) {
		if (!session) {
			return NextResponse.redirect(
				new URL(pageConfig.auth.login, request.url)
			)
		}
		return NextResponse.next()
	}
	return NextResponse.next()
}

export const config = {
	/**
	 * Список путей, к которым применяется middleware.
	 * Включает маршруты для авторизации, дашборда и корневой путь.
	 */
	matcher: ['/auth/:path*', '/dashboard/:path*', '/']
}
