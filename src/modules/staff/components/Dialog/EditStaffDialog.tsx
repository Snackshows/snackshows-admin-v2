import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast"
import {  useGetEmployeeByIdQuery, useGetNewEmployeeDataQuery, useUpdateEmployeeMutation } from "../../api/staffManagement/staffManagement.endpoint"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/context/AuthContext"
import { Switch } from "@/components/ui/switch"


interface AddNewStaffDialogProps {
    children: React.ReactNode
    staffName: string
    staffId: string
}

const staffCreateFormSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    newPassword: z.string().optional(),
    phone: z.string().optional(),
    bio: z.string().optional(),
    role: z.number(),
    isBlocked: z.boolean(),
})

export function EditStaffDialog({ children, staffName, staffId }: AddNewStaffDialogProps) {
    const [open, setOpen] = useState(false)
    const { user } = useAuth()
    
    const { mutateAsync: updateEmployee, isPending } = useUpdateEmployeeMutation()

    const { data: employeeData } = useGetEmployeeByIdQuery(staffId,open)
    const { data: employeeRolesData } = useGetNewEmployeeDataQuery()

    const form = useForm<z.infer<typeof staffCreateFormSchema>>({
        resolver: zodResolver(staffCreateFormSchema),

    })
    const {  formState:{disabled} } = form

    useEffect(() => {
        console.log(employeeData)
    }, [employeeData])


    useEffect(() => {
        if (employeeData) {
            form.reset({
                id: employeeData.id,
                name: employeeData.name,
                email: employeeData.email,
                newPassword:"",
                phone: employeeData.phone || "",
                bio: employeeData.bio || "",
                role: employeeData.role,
                isBlocked: !employeeData.isBlocked,
            })
        }
    }, [employeeData])

    async function onSubmit(value: z.infer<typeof staffCreateFormSchema>) {
        console.log(value)
        try {
            const payload = {
                id: value.id,
                name: value.name,
                email: value.email,
                password: value.newPassword,
                phone: value.phone || "",
                bio: value.bio || "",
                role: Number(value.role),
                isBlocked: !value.isBlocked,
            }
            await updateEmployee(payload)
            toast.success("Staff updated successfully")
            setOpen(false)
            form.reset()
            setOpen(false)
        } catch (error) {
            console.error(error)
            toast.error("Failed to create staff")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="w-full sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Edit {staffName} Details</DialogTitle>
                    <DialogDescription>
                        Update the details of {staffName} below. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-4">
                        <Controller
                            name="id"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="staff-name">
                                        Employee ID
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="staff-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter employee ID"
                                        disabled
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
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
                            name="newPassword"
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
                                        Phone(optional)
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="staff-phone"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter phone number"
                                        autoComplete="on"
                                        type="tel"
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

                        {
                            user?.role === 1 && employeeData?.role !== 1 && (
                                <Controller
                                    name="role"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="staff-role">
                                                Role
                                            </FieldLabel>

                                            <Select name={field.name} value={field.value?.toString()}
                                                onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {
                                                            employeeRolesData?.data?.roles?.map((role) => (
                                                                <SelectItem key={role.id} value={role.id.toString()}>
                                                                    {role.name}
                                                                </SelectItem>
                                                            ))
                                                        }
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>

                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            )
                        }




                    </FieldGroup>
                    <DialogFooter className="flex items-center sm:justify-between w-full  mt-6">
                        <div className="flex items-center  gap-2">
                            <Controller
                                name="isBlocked"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} >
                                        <section className="flex gap-2">
                                            <FieldLabel>User Active Status</FieldLabel>
                                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                                        </section>

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                        </div>
                        <div className=" w-fit flex gap-2 items-center justify-center">

                            <DialogClose>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button disabled={isPending || disabled} type="submit">
                                {isPending ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
