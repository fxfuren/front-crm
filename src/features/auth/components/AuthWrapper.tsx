import Link from 'next/link'
import { type PropsWithChildren } from 'react'

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/components/ui'

interface AuthWrapperProps {
	heading: string
	description?: string
	backButtonLabel?: string
	backButtonHref?: string
}

/**
 * Обертка для аутентификационных компонентов.
 *
 * @param {AuthWrapperProps} props - Свойства компонента, включая заголовок,
 * описание, текст кнопки "Назад" и флаг для отображения социальных кнопок.
 * @returns {JSX.Element} - Компонент обертки для аутентификации.
 */
export function AuthWrapper({
	children,
	heading,
	description,
	backButtonLabel,
	backButtonHref
}: PropsWithChildren<AuthWrapperProps>) {
	return (
		<Card className='w-[400px]'>
			<CardHeader className='space-y-2'>
				<CardTitle>{heading}</CardTitle>
				{description && (
					<CardDescription>{description}</CardDescription>
				)}
			</CardHeader>
			<CardContent>{children}</CardContent>
			<CardFooter>
				{backButtonLabel && backButtonHref && (
					<Button variant='link' className='w-full font-normal'>
						<Link href={backButtonHref}>{backButtonLabel}</Link>
					</Button>
				)}
			</CardFooter>
		</Card>
	)
}
