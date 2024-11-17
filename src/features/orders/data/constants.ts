import { CheckCircle, Circle, CircleOff, Timer } from 'lucide-react'

import { OrderStatus } from '../types'

export const statusIcons = {
	[OrderStatus.InProgress]: Timer,
	[OrderStatus.Completed]: CheckCircle,
	[OrderStatus.Pending]: Circle,
	[OrderStatus.Canceled]: CircleOff
}
