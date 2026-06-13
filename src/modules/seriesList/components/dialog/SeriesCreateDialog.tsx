
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
import { useGetCreateSeriesDataQuery, useGetCreateSeriesDataSubmitMutation } from "../../api/seriesManagement/seriesManagement.endpoint"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from "react-hot-toast"

interface SeriesCreateDialogProps {
  children: React.ReactNode
  onSave?: (data: FormData) => void
}
export function SeriesCreateDialog({ children, }: SeriesCreateDialogProps) {

  const [open, setOpen] = useState(false);
  const { data: createSeriesData, refetch } = useGetCreateSeriesDataQuery()
  const { mutateAsync: createSeriesDataSubmit, isPending: isCreatingSeries } = useGetCreateSeriesDataSubmitMutation()

  const seriesCreateFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    banner: z.file(),
    thumbnail: z.file(),

    language: z.string().min(1, "Language is required"),
    category: z.string().min(1, "At least one category is required"),
    releaseDate: z.string().min(1, "Release date is required"),
    isTrending: z.boolean().optional(),
    isAutoAnimateBanner: z.boolean().optional(),
    isActive: z.boolean().optional(),
  })

  const form = useForm<z.infer<typeof seriesCreateFormSchema>>({
    resolver: zodResolver(seriesCreateFormSchema),
  })

  const { formState: { errors } } = form

  console.log(errors)
  useEffect(() => {
    refetch()
  }, [])

  async function onSubmit(data: z.infer<typeof seriesCreateFormSchema>) {
    // Do something with the form values.
    console.log(data)

    try {



      const formData = new FormData();

      if (data.banner) {
        formData.append('banner', data.banner);
      }
      if (data.thumbnail) {
        formData.append('thumbnail', data.thumbnail);
      }
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('languageId', data.language);
      formData.append('categoryIds[]', data.category);
      formData.append('releaseDate', data.releaseDate);
      formData.append('isTrending', data.isTrending ? 'true' : 'false');
      formData.append('isAutoAnimateBanner', data.isAutoAnimateBanner ? 'true' : 'false');
      formData.append('isActive', data.isActive ? 'true' : 'false');

      //  console.table([...formData.entries()])



      await createSeriesDataSubmit(formData)
      toast.success("Series created successfully")
      setOpen(false)
    } catch (error) {
      toast.error("Failed to create series")
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
                          <SelectItem key={language.id} value={String(language.id)}>
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
              <Controller
                name="releaseDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div >

                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Release Date
                      </FieldLabel>
                      <Input
                        type="date"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
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
                      Thumbnail
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
            <Button type="submit" disabled={isCreatingSeries} className="cursor-pointer">Create Series</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
