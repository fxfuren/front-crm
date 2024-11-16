import { ToggleTheme } from '@/shared/components/ui/ToggleTheme'

export default function AuthLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<ToggleTheme />
			{children}
		</>
	)
}
