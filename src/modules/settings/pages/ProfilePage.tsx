import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";

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

const ProfilePage = () => {
    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            fullName: "Demo Admin",
            email: "demo@admin.com",
        },
    });

    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onProfileSubmit = (data: ProfileFormValues) => {
        console.log("Profile data:", data);
    };

    const onPasswordSubmit = (data: PasswordFormValues) => {
        console.log("Password data:", data);
    };

    return (
        <div className="space-y-6">
            {/* Profile Details Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        {/* Profile Picture Section */}
                        <div className="flex flex-col items-center gap-4">
                            <Avatar size="lg" className="size-20">
                                <AvatarImage src="/placeholder-avatar.png" alt="Profile" />
                                <AvatarFallback>DA</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-center gap-2">
                                <Button variant="outline" size="sm">
                                    Upload Photo
                                </Button>
                                <p className="text-xs text-muted-foreground">
                                    JPG, PNG or GIF. Max size 2MB
                                </p>
                            </div>
                        </div>

                        {/* User Info Display */}
                        <div className="flex items-center gap-3">
                            <div className="text-base font-medium">Demo Admin</div>
                            <Badge variant="secondary">Administrator</Badge>
                        </div>

                        {/* Profile Form */}
                        <Form {...profileForm}>
                            <form
                                onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                                className="space-y-6"
                            >
                                <FieldGroup>
                                    <Field orientation="vertical">
                                        <FormField
                                            control={profileForm.control}
                                            name="fullName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Full Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter your full name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Field>

                                    <Field orientation="vertical">
                                        <FormField
                                            control={profileForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="Enter your email"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </Field>
                                </FieldGroup>

                                <Button type="submit" className="w-full">
                                    Save Profile Changes
                                </Button>
                            </form>
                        </Form>
                    </div>
                </CardContent>
            </Card>

            {/* Change Password Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...passwordForm}>
                        <form
                            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                            className="space-y-6"
                        >
                            <FieldGroup>
                                <Field orientation="vertical">
                                    <FormField
                                        control={passwordForm.control}
                                        name="currentPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Current Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Enter current password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </Field>

                                <Field orientation="vertical">
                                    <FormField
                                        control={passwordForm.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Enter new password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FieldDescription>
                                                    Must be at least 8 characters
                                                </FieldDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </Field>

                                <Field orientation="vertical">
                                    <FormField
                                        control={passwordForm.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm New Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="Confirm new password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </Field>
                            </FieldGroup>

                            <Button type="submit" className="w-full">
                                Update Password
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePage;