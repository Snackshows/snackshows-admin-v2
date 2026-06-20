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
import { Loader, LockPasswordIcon, Upload01Icon } from "@hugeicons/core-free-icons";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import { useGetUserProfile, useUpdatePassword, useUpdateProfilePicture, useUpdateUserProfile } from "../api/profile/profile.endpoints";
import { useEffect } from "react";
import toast from "react-hot-toast";

const profileFormSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    bio: z.string().optional(),

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

const profilePictureSchema = z.object({
    file: z.instanceof(File).refine((file) => file.size > 0, "Please select a file"),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;
type ProfilePictureFormValues = z.infer<typeof profilePictureSchema>;

const UserProfilePage = () => {


    const { data: userProfile, refetch } = useGetUserProfile();

    const { mutateAsync: updateProfile, isPending: isUpdatingProfile } = useUpdateUserProfile();

    const { mutateAsync: updatePassword, isPending: isUpdatingPassword } = useUpdatePassword();

    const { mutateAsync: updateProfilePicture, isPending: isUpdatingProfilePicture } = useUpdateProfilePicture();


    const { user } = useAuth()
    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
    });

    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
    });

    const profilePictureForm = useForm<ProfilePictureFormValues>({
        resolver: zodResolver(profilePictureSchema),
    });


    console.log("userProfile", userProfile);
    useEffect(() => {
        if (userProfile) {
            profileForm.reset({
                fullName: userProfile.data.name,
                email: userProfile.data.email,
                bio: userProfile.data.bio || "",
            });
        }
    }, [userProfile]);

    const { watch } = profileForm;
    // const { formState: { isDirty } } = passwordForm
    const profileName = watch("fullName");


    const onProfileSubmit = async (values: ProfileFormValues) => {

        try {

            const payload = {
                id: user?.id,
                name: values.fullName,
                email: values.email,
                phone: userProfile?.data.phone || "",
                bio: values.bio || ""
            }
            await updateProfile(payload);

            toast.success("Profile updated successfully");
            refetch();
        } catch (error) {
            toast.error("Failed to update profile");
            console.log("Profile data:", values);
        }

    };

    const onPasswordSubmit = async (data: PasswordFormValues) => {

        try {

            const payload = {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword,
            }

            await updatePassword(payload);

            toast.success("Password updated successfully");
            passwordForm.reset();

        } catch (error) {
            console.log("Password data:", data);
        }
    };

    const onHandleProfilePicture = async (values: ProfilePictureFormValues) => {
        const file = values.file;

        try {
            const formData = new FormData();
            if (file) {
                if (isUpdatingProfilePicture) return;
                formData.append('image', file);
            }
            await updateProfilePicture(formData);
            toast.success("Profile picture updated successfully");
        } catch (error) {
            console.log("Profile picture error:", error);
        }
    };

    return (
        <section className="w-full flex flex-col gap-6">
            {/* Profile Details Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile Details</CardTitle>
                </CardHeader>
                <CardContent>

                    <section className="flex gap-6">
                        {/* Profile Picture Section */}
                        <form onSubmit={profilePictureForm.handleSubmit(onHandleProfilePicture)}>
                            <div className="flex flex-col items-center gap-4">
                                
                                <Avatar className="w-24 h-24 rounded-full aspect-square">
                                    {
                                        isUpdatingProfilePicture ? (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <HugeiconsIcon icon={Loader} className="animate-spin" />
                                            </div>
                                        ) : (
                                            <AvatarImage src={user?.image || "/placeholder-avatar.png"} alt="Profile" />
                                        )
                                    }
                                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-center gap-2">
                                    <Controller
                                        name="file"
                                        control={profilePictureForm.control}
                                        render={({ field: { onChange, name, ref }, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                
                                                <Input
                                                    type="file"
                                                    name={name}
                                                    ref={ref}
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        onChange(e.target.files?.[0])
                                                    }}
                                                />

                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                    <Button variant="outline" size="sm" type="submit">
                                        <HugeiconsIcon icon={Upload01Icon} />Upload Photo
                                    </Button>
                                    <p className="text-xs text-muted-foreground">
                                        JPG, PNG or GIF. Max size 2MB
                                    </p>
                                </div>
                            </div>
                        </form>

                        {/* Profile Form */}

                        <form
                            onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                            className=" flex flex-col w-full gap-4"
                        >
                            <div className="flex items-start flex-col justify-start gap-3">
                                <div className="text-base font-medium">{profileName}</div>

                                {
                                    user?.role === 1 && (
                                        <Badge variant="secondary">Administration</Badge>
                                    )
                                }
                            </div>
                            <FieldGroup className="w-full  grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                <Controller
                                    name="bio"
                                    control={profileForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                                            <Textarea
                                                {...field}
                                                id={field.name}
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Enter your description"
                                                autoComplete="off"
                                            />

                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                            <FieldGroup className="w-full  flex flex-row gap-4">
                                <Button disabled={isUpdatingProfile} type="submit">
                                    {isUpdatingProfile ? "Saving..." : "Save Profile Changes"}
                                </Button>
                            </FieldGroup>
                        </form>
                    </section>

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


                            <Button disabled={isUpdatingPassword} type="button" >
                                {isUpdatingPassword ? "Updating..." : "Update Password"}
                            </Button>

                        </FieldGroup>
                    </form>

                </CardContent>
            </Card>
        </section>
    );
};

export default UserProfilePage;