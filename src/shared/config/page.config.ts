class PageConfig {
	auth = {
		main: '/auth',
		login: '/auth/login',
		register: '/auth/register',
		newPassword: '/auth/new-password',
		newVerification: '/auth/new-verification',
		resetPassword: '/auth/reset-password'
	}

	dashboard = {
		main: '/dashboard',
		home: '/dashboard/home',
		orders: '/dashboard/orders',
		warehouse: '/dashboard/warehouse',
		settings: {
			main: '/dashboard/settings',
			profile: '/dashboard/settings/profile',
			invitation: '/dashboard/settings/invitation',
			users: '/dashboard/settings/users'
		}
	}
}

export const pageConfig = new PageConfig()
