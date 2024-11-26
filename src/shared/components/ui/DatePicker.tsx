'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/shared/utils'

import { Calendar } from './Calendar'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'
import { Button } from './button'

interface DatePickerProps {
	currentDate?: Date | string | number
	onDateChange: (newDate: Date | undefined) => void
	dateFormat?: string
	className?: string
}

export function DatePicker({
	currentDate,
	onDateChange,
	dateFormat = 'PPP',
	className
}: DatePickerProps) {
	const [date, setDate] = React.useState<Date | undefined>(
		currentDate ? new Date(currentDate) : undefined
	)

	const handleDateChange = (newDate: Date | undefined) => {
		setDate(newDate)
		onDateChange(newDate)
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-[280px] justify-start text-left font-normal',
						!date && 'text-muted-foreground',
						className
					)}
				>
					<CalendarIcon />
					{date ? (
						format(date, dateFormat)
					) : (
						<span>Выберите дату</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0'>
				<Calendar
					mode='single'
					selected={date}
					onSelect={handleDateChange}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}
