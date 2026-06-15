import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { HugeiconsIcon } from "@hugeicons/react";
import { LockPasswordIcon, Upload01Icon } from "@hugeicons/core-free-icons";
import { Separator } from "@/components/ui/separator";

const profileFormSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
});

const passwordFormSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z
            .string()
            .min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const UserProfilePage = () => {
    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            fullName: "Demo Admin",
            email: "demo@admin.com",
        },
    });

    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
    });

    const onProfileSubmit = (data: ProfileFormValues) => {
        console.log("Profile data:", data);
    };

    const onPasswordSubmit = (data: PasswordFormValues) => {
        console.log("Password data:", data);
    };

    return (
        <section className="w-full flex flex-col gap-6">
            {/* Profile Details Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                        <section className="flex gap-6">
                            {/* Profile Picture Section */}
                            <div className="flex flex-col items-center gap-4">
                                <Avatar className="w-24 h-24 rounded-full aspect-square">
                                    <AvatarImage src="/placeholder-avatar.png" alt="Profile" />
                                    <AvatarFallback>DA</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-center gap-2">
                                    <Button variant="outline" size="sm">
                                        <HugeiconsIcon icon={Upload01Icon} />Upload Photo
                                    </Button>
                                    <p className="text-xs text-muted-foreground">
                                        JPG, PNG or GIF. Max size 2MB
                                    </p>
                                </div>
                            </div>

                            {/* Profile Form */}

                            <form
                                onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                                className=" flex flex-col w-full gap-4"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-base font-medium">Demo Admin</div>
                                    <Badge variant="secondary">Administrator</Badge>
                                </div>
                                <FieldGroup className="w-full  flex flex-row gap-4">
                                    <Controller
                                        name="fullName"
                                        control={profileForm.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                                                <Input
                                                    {...field}
                                                    id={field.name}
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Enter your full name"
                                                    autoComplete="off"
                                                />

                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name="email"
                                        control={profileForm.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                                                <Input
                                                    {...field}
                                                    id={field.name}
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Enter your email"
                                                    autoComplete="off"
                                                />

                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>
                                <FieldGroup className="w-full  flex flex-row gap-4">
                                    <Button type="submit">
                                        Save Profile Changes
                                    </Button>
                                </FieldGroup>
                            </form>
                        </section>
                    </form>
                </CardContent>
            </Card>

            {/* Change Password Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex "><HugeiconsIcon icon={LockPasswordIcon} className="mr-2 text-primary" /> Change Password</CardTitle>
                    <CardDescription>
                        Update your password to keep your account secure
                    </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="w-full grid grid-cols-1 md:grid-cols-2">
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className=" w-full flex flex-col gap-4">
                        <Controller
                            name="currentPassword"
                            control={passwordForm.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your email"
                                        autoComplete="off"
                                    />

                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <FieldGroup className="flex flex-col md:flex-row gap-4">
                            <Controller
                                name="newPassword"
                                control={passwordForm.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter your email"
                                            autoComplete="off"
                                        />
                                        <FieldDescription>Must be at least 8 characters</FieldDescription>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="confirmPassword"
                                control={passwordForm.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Confirm New Password</FieldLabel>
                                        <Input
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter your email"
                                            autoComplete="off"
                                        />
                                        <FieldDescription>
                                            Enter your email address.
                                        </FieldDescription>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                        </FieldGroup>
                        <FieldGroup>

                            <ul className="list-disc rounded-xl bg-gray-100 border p-4 w-full flex flex-col items-start list-inside">
                                <li>At least 8 characters</li>
                                <li>Contains uppercase and lowercase letters</li>
                                <li>Contains at least one number</li>
                                <li>Contains a special character</li>
                            </ul>


                            <Button type="button" >
                                Update Password
                            </Button>

                        </FieldGroup>
                    </form>

                </CardContent>
            </Card>
        </section>
    );
};

export default UserProfilePage;