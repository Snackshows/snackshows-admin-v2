import { SectionCard, SectionContent, SectionHeader } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useParams } from "react-router"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useDeleteSeriesMutation, useGetSeriesDetailsQuery, useUpdateSeriesMutation } from "../api/seriesManagement/seriesManagement.endpoint"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { useEffect } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetAllLanguagesDataQuery } from "@/modules/languages/api/languagrList/languageList.endpoints"
import { useGetCategoriesQuery } from "@/modules/category/api/categoryManagement/categoryManagement.endpoint"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePicker } from "@/components/ui/date-picker"
import toast from "react-hot-toast"

const seriesDetailsSchema = z.object({
  name: z.string().min(1, "Series name is required"),
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

type SeriesFormData = z.infer<typeof seriesDetailsSchema>

const SeriesDetailsPage = () => {
  const { seriesId } = useParams<{ seriesId: string }>()

  const { data: seriesDetails } = useGetSeriesDetailsQuery(seriesId || "")

  const { data: languagesData } = useGetAllLanguagesDataQuery()
  const { data: categoriesData } = useGetCategoriesQuery()
  const { mutate: deleteSeriesMutation } = useDeleteSeriesMutation()
  const { mutate: updateSeriesMutation } = useUpdateSeriesMutation()


  const form = useForm<SeriesFormData>({
    resolver: zodResolver(seriesDetailsSchema),
    defaultValues: {
      name: seriesDetails?.data?.name || "",
      description: seriesDetails?.data?.description || "",

      language: seriesDetails?.data?.language || "",

      releaseDate: seriesDetails?.data?.releaseDate || "",
      isTrending: seriesDetails?.data?.isTrending || false,
      isAutoAnimateBanner: seriesDetails?.data?.isAutoAnimateBanner || false,
      isActive: seriesDetails?.data?.isActive || false,
    },

  })




  const { formState: { isSubmitting, isDirty } } = form


  useEffect(() => {
    if (seriesDetails) {
      form.reset({
        name: seriesDetails.data.name,
        description: seriesDetails.data.description,
      })
    }
  }, [seriesDetails, form])

  const onSubmit = (data: SeriesFormData) => {
    // TODO: Implement save functionality
    console.log("Saving series data:", data)

    try {
      // TODO: Implement save functionality
      console.log("Saving series data:", data)

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

      updateSeriesMutation(formData)
      toast.success("Series saved successfully")
    } catch (error) {
      console.error("Error saving series:", error)
      toast.error("Error saving series")
    }
  }

  const handelDeleteSeries = () => {
    // TODO: Implement delete functionality
    console.log("Deleting series")
    try {
      deleteSeriesMutation(seriesId || "")
      console.log("Series deleted successfully")
      toast.success("Series deleted successfully")
    } catch (error) {
      console.error("Error deleting series:", error)
      toast.error("Error deleting series")
    }
  }
  return (
    <section className='w-full p-4 flex flex-col gap-6'>
      <SectionCard className="w-full">
        <SectionHeader>
          Series Details
        </SectionHeader>
        <SectionContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left Side - Thumbnail and Banner Preview */}
            <section className="space-y-4">
              <div className="space-y-2">
                <Label>Thumbnail Preview</Label>
                {seriesDetails?.data?.thumbnail ? (
                  <img
                    src={seriesDetails.data.thumbnail}
                    alt="Thumbnail"
                    className="w-48 aspect-9/16 object-cover rounded-md border"
                  />
                ) : (
                  <div className="w-48 aspect-9/16 bg-gray-100 rounded-md border flex items-center justify-center text-gray-400">
                    No thumbnail
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Banner Preview</Label>
                {seriesDetails?.data?.banner ? (
                  <img
                    src={seriesDetails.data.banner}
                    alt="Banner"
                    className="w-full h-32 object-cover rounded-md border"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-100 rounded-md border flex items-center justify-center text-gray-400">
                    No banner
                  </div>
                )}
              </div>
            </section>

            {/* Right Side - Form Fields */}
            <section className="lg:col-span-2 border-l border-gray-200 pl-6 space-y-4">
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
              <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">

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

                            {categoriesData?.map((category) => (
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
                            {languagesData?.data?.map((language:any) => (
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
                  name="releaseDate"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>


                      <FieldLabel htmlFor="releaseDate">
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

              <section className="w-full my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">

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





              <section className=" w-full mt-6 flex justify-start">
                <Button disabled={!isDirty || isSubmitting} type="submit">Save Changes</Button>
              </section>
            </section>

          </form>
        </SectionContent>
      </SectionCard>

      {/* <SectionCard className="w-full">
        <SectionHeader>
          Episodes Table
        </SectionHeader>
        <SectionContent>
          {/* Episodes Table 
          <section className="w-full">
            <h3 className="text-lg font-semibold mb-4">Episodes</h3>
            <ControllableDataTable
              columns={episodeTableColumns}
              data={[]}
              actionButton={
                <AddNewEpisodeDialog seriesId={seriesId} lastEpisodeNumber={Number(seriesDetails?.data?.totalShortVideos || 0)}>
                  <Button>
                    Add Episode
                  </Button>
                </AddNewEpisodeDialog>
              }
            />
          </section>
        </SectionContent>
      </SectionCard> */}



      <section className="w-full flex flex-col items-start my-10 gap-4">
        <div className="w-full flex-col gap-3 flex items-start justify-between">
          <Label>Delete the Series</Label>
          <Button onClick={handelDeleteSeries} >
            Delete Series
          </Button>
        </div>


      </section>
    </section >
  )
}

export default SeriesDetailsPage
