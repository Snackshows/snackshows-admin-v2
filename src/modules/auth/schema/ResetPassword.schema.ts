import * as z from "zod"

export const resetPasswordFormSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters."),
  comparedPassword: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters."),
}).refine((data) => data.password === data.comparedPassword, {
  message: "Passwords don't match",
  path: ["comparedPassword"],
})

export default resetPasswordFormSchema

export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>