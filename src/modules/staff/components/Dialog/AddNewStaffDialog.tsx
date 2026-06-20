import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast"
import { useAddNewEmployeeMutation } from "../../api/staffManagement/staffManagement.endpoint"

interface AddNewStaffDialogProps {
    children: React.ReactNode
}

const staffCreateFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").max(50, "Password must be at most 50 characters"),
    phone: z.string().optional(),
    bio: z.string().optional(),
    role: z.string().min(1, "Role is required"),
})

export function AddNewStaffDialog({ children }: AddNewStaffDialogProps) {
    const [open, setOpen] = useState(false)
    const { mutateAsync: createEmployee, isPending } = useAddNewEmployeeMutation()

    const form = useForm<z.infer<typeof staffCreateFormSchema>>({
        resolver: zodResolver(staffCreateFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            bio: "",
            role: "2",
        },
    })

    async function onSubmit(data: z.infer<typeof staffCreateFormSchema>) {
        console.log(data)
        try {
            const payload = {
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
                bio: data.bio || "",
                role: Number(data.role),
            }
            await createEmployee(payload)
            toast.success("Staff created successfully")
            setOpen(false)
            form.reset()
        } catch (error) {
            console.error(error)
            toast.error("Failed to create staff")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New Staff</DialogTitle>
                    <DialogDescription>
                        Add a new staff member below. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-4">
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="staff-name">
                                        Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="staff-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter staff name"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="staff-email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="staff-email"
                                        type="email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter email address"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="staff-password">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="staff-password"
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter password"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="staff-phone">
                                        Phone (Optional)
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="staff-phone"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter phone number"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="bio"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="staff-bio">
                                        Bio
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="staff-bio"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter bio (optional)"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="role"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="staff-role">
                                        Role
                                    </FieldLabel>
                                    <select
                                        {...field}
                                        id="staff-role"
                                        aria-invalid={fieldState.invalid}
                                        className="h-9 w-full min-w-0 rounded-3xl border border-transparent bg-input/50 px-3 py-1 text-base transition-[color,box-shadow,background-color] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
                                    >
                                        <option value={1}>Admin</option>
                                        <option value={2}>Staff</option>
                                    </select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <DialogFooter className="flex justify-end mt-6">
                        <DialogClose>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={isPending} type="submit">
                            {isPending ? "Adding..." : "Add Staff"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
