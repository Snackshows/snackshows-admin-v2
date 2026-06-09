import { useEffect, useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useEditCategoryMutation, useGetCategoryDetailsQuery } from "../../api/editCategory/editCategory.endpoint"

// interface EditCategoryDialogProps {
//   category: Category | null
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   onSave: (category: Category) => void
// }
interface EditCategoryDialogProps {
  children: React.ReactNode
  categoryId: string
}

export function EditCategoryDialog({
  children,
  categoryId
}: EditCategoryDialogProps) {


  const [open, setOpen] = useState<boolean>(false);

  const editCategoryFormSchema = z.object({
    name: z
      .string()
      .min(5, "Category name must be at least 5 characters.")
      .max(32, "Category name must be at most 32 characters.").optional(),
    uniqueId: z.string().optional(),
    description: z
      .string()
      .max(100, "Description must be at most 100 characters.").optional(),
    isActive: z.boolean().optional(),
    image: z.file().optional(),
  })


  const { data: categoryData } = useGetCategoryDetailsQuery(categoryId, {
    enabled: open && !!categoryId,
  })

  const { mutateAsync, isPending } = useEditCategoryMutation()


  const form = useForm<z.infer<typeof editCategoryFormSchema>>({
    resolver: zodResolver(editCategoryFormSchema),

  })



  useEffect(() => {
    if (categoryData) {
      console.log(categoryData)
      form.reset({
        name: categoryData.data.name || "",
        description: categoryData.data.description || "",
        isActive: categoryData.data.isActive || false,
        uniqueId: categoryData.data.uniqueId || "",

      })
    }
  }, [categoryData, form])

  async function onSubmit(data: z.infer<typeof editCategoryFormSchema>) {
    // Do something with the form values.
    console.log(data)
    try {

      const formData = new FormData()

      if (data.image) {
        formData.append("image", data.image)
      }
      formData.append("id", categoryId)
      formData.append("name", data.name)
      formData.append("description", data.description)
      formData.append("isActive", String(data.isActive))

      // console.table([...formData.entries()])

      await mutateAsync(formData)

      toast.success("Category Updated successfully")
      form.reset()
      setOpen(false) // Close dialog
    } catch (error: any) {
      console.log(error)
      toast.error("Failed to update category")
    }
  }



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>

        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          <FieldGroup className=" gap-2">


            <Controller
              name='name'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Category Name
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter category name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="uniqueId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Category Unique ID
                  </FieldLabel>
                  <Input
                    {...field}
                    disabled
                    placeholder="Enter category unique id"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='description'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Category Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter category description"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='isActive'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Is Active
                  </FieldLabel>
                  <div className="w-full">

                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked === true);
                      }}
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="image"
              control={form.control}
              render={({ field: { onChange, name, ref }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Poster
                  </FieldLabel>
                  <Input
                    type="file"
                    name={name}
                    ref={ref}
                    accept="image/*"
                    onChange={(e) => {
                      onChange(e.target.files?.[0])
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />


          </FieldGroup>

          <DialogFooter className="flex justify-end mt-10">
            <DialogClose asChild>

              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit"
              disabled={isPending}
              className="cursor-pointer">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
