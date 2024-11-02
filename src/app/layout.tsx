import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { MainProvider } from '@/shared/providers'
import '@/shared/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
	title: {
		absolute: 'crm-app'
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<MainProvider>
					<div className='relative flex min-h-screen flex-col'>
						<div className='flex h-screen w-full items-center justify-center px-4'>
							{children}
						</div>
					</div>
				</MainProvider>
			</body>
		</html>
	)
}
