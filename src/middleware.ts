import { type NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
	const { url, cookies } = request

	const session = cookies.get('session')?.value

	const isAuthPage = url.includes('/auth')
	const isRootPage = url === new URL(request.url).origin + '/'

	if (isRootPage) {
		return NextResponse.redirect(new URL('/dashboard/settings', request.url))
	}

	if (isAuthPage) {
		if (session) {
			return NextResponse.redirect(new URL('/dashboard/settings', request.url))
		}
		return NextResponse.next()
	}

	if (!session) {
		return NextResponse.redirect(new URL('/auth/login', request.url))
	}
}

export const config = {
	matcher: ['/auth/:path*', '/dashboard/:path*', '/']
}
