
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useGetCreateSeriesDataQuery } from "../../api/seriesManagement/seriesManagement.endpoint"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SeriesCreateDialogProps {
  children: React.ReactNode
  onSave?: (data: FormData) => void
}
export function SeriesCreateDialog({ children, }: SeriesCreateDialogProps) {

  const [open, setOpen] = useState(false);
  const { data: createSeriesData, refetch } = useGetCreateSeriesDataQuery()

  const seriesCreateFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    banner: z
      .custom<FileList>()
      .refine((files) => files && files.length === 1, 'File is required')
      .optional(),
    thumbnail: z
      .custom<FileList>()
      .refine((files) => files && files.length === 1, 'File is required')
      .optional(),
    type: z.string().optional(),
    language: z.string().min(1, "Language is required"),
    category: z.string().min(1, "At least one category is required"),
    maxAdsForFreeView: z.string().optional(),
    releaseDate: z.string().min(1, "Release date is required"),
    isTrending: z.boolean().optional(),
    isAutoAnimateBanner: z.boolean().optional(),
    isActive: z.boolean().optional(),
  })



  const form = useForm<z.infer<typeof seriesCreateFormSchema>>({
    resolver: zodResolver(seriesCreateFormSchema),

  })


  useEffect(() => {
    refetch()
  }, [])


  function onSubmit(data: z.infer<typeof seriesCreateFormSchema>) {
    // Do something with the form values.
    console.log(data)

    try {

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Series</DialogTitle>
          <DialogDescription>
            Add a new series below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          <FieldGroup className=" gap-2">
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Category
                  </FieldLabel>
                  <Select name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>

                        {createSeriesData?.data?.categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='language'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Language
                  </FieldLabel>
                  <Select name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {createSeriesData?.data?.languagesData?.map((language) => (
                          <SelectItem key={language.id} value={language.id}>
                            {language.name}
                          </SelectItem>
                        ))}

                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Series Name
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter series name"
                    autoComplete="off"
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
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter description"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">

              <Controller
                name="isTrending"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} >
                    <div className="w-full flex items-center gap-2 justify-start ">
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Is Trending
                      </FieldLabel>

                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}

                        aria-invalid={fieldState.invalid}


                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="isAutoAnimateBanner"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="w-full flex items-center gap-2 justify-start ">

                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Is Auto Animate Banner
                      </FieldLabel>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}

                        aria-invalid={fieldState.invalid}


                      />
                    </div>
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
                    <div className="w-full flex items-center gap-2 justify-start ">

                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Is Active
                      </FieldLabel>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-invalid={fieldState.invalid}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </section>
            <section className="grid grid-cols-2 gap-4 mt-4">
              <Controller
                name="thumbnail"
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
              <Controller
                name="banner"
                control={form.control}
                render={({ field: { onChange, name, ref }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Banner
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
            </section>

          </FieldGroup>
          <DialogFooter className="flex justify-end mt-10">
            <DialogClose>
              <Button type="button" variant="outline" >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
