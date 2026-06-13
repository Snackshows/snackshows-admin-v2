import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { useCreateSubscriptionMutation } from "../../api/createSubscription/createSubscription.endpoint"
import toast from "react-hot-toast"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

interface CreateSubscriptionDialogProps {
    children: React.ReactNode
}

export function CreateSubscriptionDialog({
    children
}: CreateSubscriptionDialogProps) {

    const [open, setOpen] = useState(false);
    const { mutateAsync: createSubscription, isPending } = useCreateSubscriptionMutation()

    const createSubscriptionFormSchema = z.object({
        name: z
            .string()
            .min(3, "Subscription name must be at least 3 characters.")
            .max(100, "Subscription name must be at most 100 characters."),
        description: z
            .string()
            .min(10, "Description must be at least 10 characters.")
            .max(500, "Description must be at most 500 characters."),
        code: z
            .string()
            .min(2, "Code must be at least 2 characters.")
            .max(20, "Code must be at most 20 characters.")
            .toUpperCase(),
        amount: z
            .string()
            .min(1, "Amount is required.")
            .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
                message: "Amount must be a valid number."
            }),
        currencyId: z
            .string()
            .min(1, "Currency ID is required."),
        intervalPeriod: z
            .string()
            .min(1, "Interval period is required.")
            .refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
                message: "Interval period must be a valid number."
            }),
        duration: z
            .string()
            .min(1, "Duration is required.")
            .refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
                message: "Duration must be a valid number."
            }),
        isFree: z.boolean().optional(),
        features: z
            .string()
            .min(1, "Features are required."),
        isActive: z.boolean().optional(),
    })

    const form = useForm<z.infer<typeof createSubscriptionFormSchema>>({
        resolver: zodResolver(createSubscriptionFormSchema),
        defaultValues: {
            isFree: false,
            isActive: true,
            currencyId: "01KTWXMAHAFNKJ04MPGQZB7EHQ"
        }
    })

    async function onSubmit(data: z.infer<typeof createSubscriptionFormSchema>) {
        console.log(data)

        try {
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("description", data.description)
            formData.append("code", data.code)
            formData.append("amount", data.amount)
            formData.append("currencyId", data.currencyId)
            formData.append("intervalPeriod", data.intervalPeriod)
            formData.append("duration", data.duration)
            formData.append("isFree", data.isFree ? "true" : "false")
            formData.append("isActive", data.isActive ? "true" : "false")

            const featuresArray = data.features.split(',').map(f => f.trim()).filter(f => f.length > 0)
            formData.append("features", JSON.stringify(featuresArray))

            await createSubscription(formData)

            toast.success("Subscription created successfully")
            form.reset()
            setOpen(false)
        } catch (error: any) {
            console.log(error)
            toast.error("Failed to create subscription")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create Subscription</DialogTitle>
                    <DialogDescription>
                        Create a new subscription plan below. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className=" gap-2">
                        <Controller
                            name='name'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="subscription-name">
                                        Subscription Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter subscription name"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name='description'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="subscription-description">
                                        Description
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter subscription description"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name='code'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="subscription-code">
                                        Code
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="e.g., FREE, PREMIUM"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name='amount'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="subscription-amount">
                                        Amount
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        step="0.01"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter amount"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name='currencyId'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="subscription-currencyId">
                                        Currency ID
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter currency ID"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name='intervalPeriod'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="subscription-intervalPeriod">
                                        Interval Period
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="e.g., 1 for monthly"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name='duration'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="subscription-duration">
                                        Duration
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="e.g., 30 for 30 days"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name='isFree'
                            control={form.control}
                            render={({ field }) => (
                                <Field>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="isFree"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <FieldLabel htmlFor="isFree">
                                            Free Plan
                                        </FieldLabel>
                                    </div>
                                </Field>
                            )}
                        />
                        <Controller
                            name='features'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="subscription-features">
                                        Features (comma separated)
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="e.g., HD Streaming, 4 Screens, Offline Download"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <DialogFooter className="flex justify-end mt-10">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending} className="cursor-pointer">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
