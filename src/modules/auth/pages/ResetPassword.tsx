import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router";
import resetPasswordFormSchema, { type ResetPasswordFormValues } from "../schema/ResetPassword.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResetPasswordMutation } from "../api/resetPassword/resetPassword.endpoint";
import { useNavigate } from "react-router";

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // URL: /search?q=javascript
    const token = searchParams.get("token");

    const { mutateAsync: resetPasswordMutate, isPending: isResettingPassword } = useResetPasswordMutation()
    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordFormSchema),
    })

    async function onSubmit(values: ResetPasswordFormValues) {
        // Do something with the form values.
        console.log(values)

        try {

            const payload = {
                resetToken:token,
                password: values.password,
                comparedPassword:values.comparedPassword
            }
            const response = await resetPasswordMutate(payload)

            toast.success("Password reset successful")
            console.log(response)
            navigate("/login")
        } catch (error) {
            toast.error("Password reset failed")
            console.error(error)
        }

    }
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">

                <div className="flex flex-col gap-6">
                    <form onSubmit={form.handleSubmit(onSubmit)}>

                        <Card>
                            <CardHeader className="text-center">
                                {/* <div className="flex justify-center">
                                    <img src="/logo.png" alt="Logo" className="w-20 h-20" />
                                </div> */}

                                <CardTitle className="text-xl">Snackshows Admin</CardTitle>
                                <CardDescription>
                                    Reset your password
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FieldGroup>

                                   
                                    <Controller
                                        name="password"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <div className="flex items-center">
                                                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                                    
                                                </div>

                                                <Input {...field} id={field.name} type="password" placeholder="********" aria-invalid={fieldState.invalid} />
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name="comparedPassword"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <div className="flex items-center">
                                                    <FieldLabel htmlFor={field.name}>Compared Password</FieldLabel>
                                                   
                                                </div>

                                                <Input {...field} id={field.name} type="password" placeholder="********" aria-invalid={fieldState.invalid} />
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                    <Button type="submit" disabled={isResettingPassword}>
                                        {isResettingPassword ? "Resetting..." : "Reset"}
                                    </Button>

                                </FieldGroup>
                                {/*                                    
                                        <Field>
                                            <Button type="submit">Login</Button>
                                            <FieldDescription className="text-center">
                                                Don&apos;t have an account? <a href="#">Sign up</a>
                                            </FieldDescription>
                                        </Field> */}

                            </CardContent>
                        </Card>
                    </form>
                    <FieldDescription className="px-6 text-center">
                        By clicking continue, you agree to our <Link to="/terms-of-service">Terms of Service</Link>{" "}
                        and <Link to="/privacy-policy">Privacy Policy</Link>.
                    </FieldDescription>
                </div>


            </div >
        </div >
    )
}

export default ResetPasswordPage