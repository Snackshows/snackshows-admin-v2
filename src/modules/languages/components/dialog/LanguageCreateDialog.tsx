import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useCreateLanguageMutation } from "../../api/languagrList/languageList.endpoints"
import toast from "react-hot-toast"

interface LanguageCreateDialogProps {
  children: React.ReactNode
}

const languageCreateFormSchema = z.object({
  name: z.string().min(1, "Language name is required"),
  isActive: z.boolean().optional(),
})

export function LanguageCreateDialog({ children }: LanguageCreateDialogProps) {
  const [open, setOpen] = useState(false)
  const { mutateAsync: createLanguage, } = useCreateLanguageMutation()

  const form = useForm<z.infer<typeof languageCreateFormSchema>>({
    resolver: zodResolver(languageCreateFormSchema),
    defaultValues: {
      name: "",
      isActive: true,
    },
  })

  async function onSubmit(data: z.infer<typeof languageCreateFormSchema>) {
    console.log(data)
    try {

      const payload = {
        name: data.name,
        isActive: data.isActive ?? true,
      }
      await createLanguage(payload)
      toast.success("Language created successfully")
      setOpen(false)
    } catch (error) {
      console.error(error)
      toast.error("Failed to create language")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Language</DialogTitle>
          <DialogDescription>
            Add a new language below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="language-name">
                    Language Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="language-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter language name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="isActive"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="language-active"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldLabel htmlFor="language-active">
                      Active
                    </FieldLabel>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter className="flex justify-end mt-6">
            <DialogClose>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
