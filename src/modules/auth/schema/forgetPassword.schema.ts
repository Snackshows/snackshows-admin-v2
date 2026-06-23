import * as z from "zod"

export const forgetPasswordFormSchema = z.object({
  email: z
    .email()
    .min(5, "Email must be at least 5 characters.")
    .max(100, "Email must be at most 100 characters."),
})

export default forgetPasswordFormSchema

export type ForgetPasswordFormValues = z.infer<typeof forgetPasswordFormSchema>