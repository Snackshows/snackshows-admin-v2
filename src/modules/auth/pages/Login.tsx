import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { FieldGroup, Field, FieldDescription, FieldLabel, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import loginFormSchema from '../schema/loginForm.schema'
import { Controller, useForm } from 'react-hook-form'
import type { LoginFormValues } from '../schema/loginForm.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { loginService } from '../api/loginPage/login.endpoint'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

const LoginPage = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const { formState: { isSubmitting } } = form

    async function onSubmit(data: LoginFormValues) {
        // Do something with the form values.
        console.log(data)

        try {
            const response = await loginService({
                email: data.email,
                password: data.password,
            })

            setUser(response.data.data.user);
            toast.success("Login successful")
            navigate('/');
            console.log(response)

        } catch (error) {


            toast.error("Login failed")
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
                                <div className="flex justify-center">
                                    <img src="/logo.png" alt="Logo" className="w-20 h-20" />
                                </div>

                                <CardTitle className="text-xl">Snackshows Admin</CardTitle>
                                {/* <CardDescription>
                                    Login with your Apple or Google account
                                </CardDescription> */}
                            </CardHeader>
                            <CardContent>
                                <FieldGroup>

                                    {/* <Field>
                                            <Button variant="outline" type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                            fill="currentColor"
                                            />
                                            </svg>
                                            Login with Apple
                                            </Button>
                                            <Button variant="outline" type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                            />
                                            </svg>
                                            Login with Google
                                            </Button>
                                            </Field> */}
                                    {/* <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                            Or continue with
                                            </FieldSeparator> */}
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
                                    <Controller
                                        name="password"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <div className="flex items-center">
                                                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                                    <Link
                                                        to="/forget-password"
                                                        className="ml-auto text-sm underline-offset-4 hover:underline"
                                                    >
                                                        Forgot your password?
                                                    </Link>
                                                </div>

                                                <Input {...field} id={field.name} type="password" placeholder="********" aria-invalid={fieldState.invalid} />
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Logging in..." : "Login"}
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

export default LoginPage