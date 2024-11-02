'use client'

import { type PropsWithChildren } from 'react'

import { TanstackQueryProvider } from './index'

/**
 * Оборачивает дочерние элементы в провайдеры для управления состоянием, темами и уведомлениями.
 *
 * @param {PropsWithChildren<unknown>} props - Свойства компонента.
 * @returns {JSX.Element} - Провайдеры с дочерними элементами.
 */
export function MainProvider({ children }: PropsWithChildren<unknown>) {
	return <TanstackQueryProvider>{children}</TanstackQueryProvider>
}
