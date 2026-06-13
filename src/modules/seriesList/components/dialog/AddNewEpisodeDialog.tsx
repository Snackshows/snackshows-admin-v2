
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import { useAddNewEpisodeMutation } from "../../api/episodeCreation/episodeCreation.endpoint"
import toast from "react-hot-toast"

const addEpisodeFormSchema = z.object({
  episodeName: z.string().min(1, "Episode name is required"),
  episodeDescription: z.string().min(1, "Episode description is required").optional(),
  episodeNumber: z.number().min(1, "Episode number is required"),
  thumbnail: z.file().optional(),
  isPaid: z.boolean().optional(),
  isLocked: z.boolean().optional(),
  releaseDate: z.string().min(1, "Release date is required"),
})

interface AddNewEpisodeDialogProps {
  children: React.ReactNode
  lastEpisodeNumber: number,
  seriesId: string
}
export function AddNewEpisodeDialog({ children, lastEpisodeNumber, seriesId }: AddNewEpisodeDialogProps) {

  const [open, setOpen] = useState(false);

  const { mutateAsync: addNewEpisode, isPending: isAddingEpisode } = useAddNewEpisodeMutation()



  const form = useForm<z.infer<typeof addEpisodeFormSchema>>({
    resolver: zodResolver(addEpisodeFormSchema),

    defaultValues: {
      episodeNumber: lastEpisodeNumber + 1,
      isPaid: false,
      isLocked: false,
      episodeDescription: "",
    },

  })

  async function onSubmit(data: z.infer<typeof addEpisodeFormSchema>) {
    // Do something with the form values.
    console.log(data)


    try {
      const formData = new FormData();

      if (data.thumbnail) {
        formData.append('thumbnail', data.thumbnail);
      }

      formData.append('seriesId', seriesId);
      formData.append('title', data.episodeName);
      formData.append('description', data.episodeDescription);
      formData.append('episodeNumber', data.episodeNumber.toString());
      formData.append('isPaid', data.isPaid ? 'true' : 'false');
      formData.append('isLocked', data.isLocked ? 'true' : 'false');
      formData.append('releaseDate', data.releaseDate);

      // console.table([...formData.entries()])
      await addNewEpisode(formData)

      toast.success("Episode added successfully")
      setOpen(false)


    } catch (error) {
      console.log(error)
      toast.error("Failed to add episode")
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
          <section className="w-full space-y-4">


            <FieldGroup className=" gap-2">
              <Controller
                name="episodeName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Episode Name
                    </FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter episode name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name='episodeDescription'
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
            </FieldGroup>

            <FieldGroup>
              <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Controller
                  name="episodeNumber"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Episode Number
                      </FieldLabel>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter episode number"
                        type="number"
                        disabled
                      />
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
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Release Date
                      </FieldLabel>
                      <DatePicker
                        {...field}
                        aria-invalid={fieldState.invalid}

                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

              </section>
            </FieldGroup>
            <FieldGroup className="my-5">
              <Controller
                name="isPaid"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="w-full flex items-center gap-2 justify-start ">

                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-invalid={fieldState.invalid}
                      />
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Lock this Episode( Paid plans only)
                      </FieldLabel>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}

              />
            </FieldGroup>
            <FieldGroup>

              <section className="grid grid-cols-2 gap-4 ">
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

              </section>

            </FieldGroup>

          </section>
          <DialogFooter className="flex justify-end mt-10">
            <DialogClose>
              <Button type="button" variant="outline" >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isAddingEpisode} className="cursor-pointer">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
