'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from './index'

interface ToggleThemeProps {
	asButton?: boolean
}

export function ToggleTheme({ asButton }: ToggleThemeProps) {
	const { setTheme, theme } = useTheme()

	const triggerClassName = asButton ? 'w-full' : 'absolute left-5 top-5'

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	if (asButton) {
		return (
			<DropdownMenuItem
				onClick={toggleTheme}
				className={`${triggerClassName} pl-0`}
			>
				<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
				<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
				Смена темы
			</DropdownMenuItem>
		)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={triggerClassName} asChild>
				<Button variant='outline' size='icon'>
					<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Смена темы</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => setTheme('light')}>
					Светлая
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					Тёмная
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
