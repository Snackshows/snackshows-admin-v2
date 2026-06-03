import * as z from "zod"

export const loginFormSchema = z.object({
  email: z
    .email()
    .min(5, "Email must be at least 5 characters.")
    .max(32, "Email must be at most 32 characters."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters."),
})

export default loginFormSchema

export type LoginFormValues = z.infer<typeof loginFormSchema>