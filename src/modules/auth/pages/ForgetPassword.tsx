import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link} from 'react-router';
import forgetPasswordFormSchema, { type ForgetPasswordFormValues } from '../schema/forgetPassword.schema';
import toast from 'react-hot-toast';
import { useForgetPasswordMutation } from '../api/forgetPassword/forgetPassword.endpoint';
import { useState } from 'react';

const ForgetPasswordPage = () => {
    const [isSent, setIsSent] = useState(false);
    const form = useForm<ForgetPasswordFormValues>({
        resolver: zodResolver(forgetPasswordFormSchema),
    })
    const { mutateAsync: forgetPasswordMutate, isPending } = useForgetPasswordMutation();


    async function onSubmit(data: ForgetPasswordFormValues) {
        // Do something with the form values.
        console.log(data)

        try {
            const response = await forgetPasswordMutate({
                email: data.email,
            })
            setIsSent(true)

            toast.success("Password reset link has been sent to your email")
            console.log(response)
        } catch (error) {
            toast.error("Failed to send password reset link")
            console.error(error)
        }

    }
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">

                <div className="flex flex-col gap-6">
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {
                            isSent ? <Card>
                                <CardHeader className="text-center">
                                    <CardTitle className="text-xl">Forget Password</CardTitle>
                                </CardHeader>



                                <CardContent>
                                    <section className='flex items-center justify-center'>
                                        <img src="/assets/send.png" alt="Logo" className="w-20 h-20" />
                                    </section>

                                    <Field className=" flex items-center mt-6 justify-center">
                                        <FieldDescription className='font-bold text-lg text-center text-black'>
                                            Password reset link has been <br /> sent to your email.
                                        </FieldDescription>
                                    </Field>
                                    <Field className=" flex items-center mt-6 justify-center">
                                        <FieldDescription className='text-center'>
                                            If you have an account, <Link to="/login">Sign in</Link>
                                        </FieldDescription>
                                    </Field>

                                </CardContent>
                            </Card> :
                                <Card>
                                    <CardHeader className="text-center">
                                        <div className="flex justify-center">
                                            <img src="/logo.png" alt="Logo" className="w-20 h-20" />
                                        </div>

                                        <CardTitle className="text-xl">Forget Password</CardTitle>
                                        {/* <CardDescription>
                                    Login with your Apple or Google account
                                </CardDescription> */}
                                    </CardHeader>


                                    <CardContent>
                                        <FieldGroup>
                                            <Controller
                                                name="email"
                                                control={form.control}
                                                render={({ field, fieldState }) => (
                                                    <Field data-invalid={fieldState.invalid}>
                                                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                                        <Input {...field} type='email' id={field.name} placeholder="m@example.com" aria-invalid={fieldState.invalid} />
                                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                    </Field>
                                                )}
                                            />


                                            <Button type="submit" disabled={isPending}>
                                                {isPending ? "Sending..." : "Send"}
                                            </Button>

                                        </FieldGroup>

                                        <Field className="text-center flex items-center mt-4">
                                            <FieldDescription>
                                                If you have an account, <Link to="/login">Sign in</Link>
                                            </FieldDescription>
                                        </Field>

                                    </CardContent>
                                </Card>

                        }
                    </form>

                </div>


            </div >
        </div >
    )
}

export default ForgetPasswordPage