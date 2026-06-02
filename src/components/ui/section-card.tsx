import * as React from 'react';

import { cn } from '@/lib/utils';

const SectionCard = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'bg-card text-card-foreground rounded-xl border shadow-sm',
			className
		)}
		{...props}
	/>
));
SectionCard.displayName = 'Card';

const SectionHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'bg-primary flex flex-col space-y-1.5 p-3 text-left font-semibold text-white uppercase',
			className
		)}
		{...props}
	/>
));
SectionHeader.displayName = 'CardHeader';

const SectionTitle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('leading-none font-semibold tracking-tight', className)}
		{...props}
	/>
));
SectionTitle.displayName = 'CardTitle';

const SectionDescription = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('text-muted-foreground text-sm', className)}
		{...props}
	/>
));
SectionDescription.displayName = 'CardDescription';

const SectionContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('p-4', className)} {...props} />
));
SectionContent.displayName = 'CardContent';

const SectionFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('flex items-center p-6 pt-0', className)}
		{...props}
	/>
));
SectionFooter.displayName = 'CardFooter';

export {
	SectionCard,
	SectionHeader,
	SectionFooter,
	SectionTitle,
	SectionDescription,
	SectionContent,
};
