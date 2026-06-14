'use client';


import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from './calendar';
import {  Calendar03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface DatePickerProps {
	value?: string;
	onChange: (value?: string) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	// disabledDate?: string;
	disabledPreviousDate?: boolean;
}

export function DatePicker({
	value,
	onChange,
	placeholder = 'Pick a date',
	disabled = false,
	disabledPreviousDate=false,
	// disabledDate,
	className,
}: DatePickerProps) {
	// const specialDate = disabledDate ? new Date("disabledDate`) : undefined;
	// specialDate?.setHours(0, 0, 0, 0);
	const currentDate = value ? new Date(value) : undefined;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						'w-full justify-start text-left font-normal',
						!currentDate && 'text-muted-foreground',
						className
					)}
					disabled={disabled}
				>
				<HugeiconsIcon icon={Calendar03Icon} />
					
					{currentDate ? (
						format(currentDate, 'PPP')
					) : (
						<span>{placeholder}</span>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={currentDate}
					onSelect={(date) => {
						if (!date) {
							onChange(undefined);
							return;
						}

						// ✅ SAFE: No timezone issues
						const safeDate = format(date, 'yyyy-MM-dd');
						onChange(safeDate);
						// const selected = new Date(date);
						// const now = new Date();

						// selected.setHours(
						// 	now.getHours(),
						// 	now.getMinutes(),
						// 	now.getSeconds(),
						// 	now.getMilliseconds()
						// );

						// prevent timezone shifting to previous day
						// const safeDate = selected
						// 	.toLocaleString('en-ca', { hour12: false })
						// 	.replace(',', '');
						// .concat('.000');
						// onChange(safeDate);
					}}
					
					captionLayout="dropdown"

					///stop picking the previous dates
					disabled={
					disabledPreviousDate && [
						{
							before: new Date(),
						},
						//  specialDate,
					]
					}
				/>
			</PopoverContent>
		</Popover>
	);
}
