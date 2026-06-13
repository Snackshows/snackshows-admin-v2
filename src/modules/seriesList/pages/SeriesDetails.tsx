import { SectionCard, SectionContent, SectionHeader } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ControllableDataTable } from "@/components/ui/controllable-data-table"
import { episodeTableColumns } from "../../episodeList/components/tables/episodeTableColumns"
import { useParams } from "react-router"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useGetSeriesDetailsQuery } from "../api/seriesManagement/seriesManagement.endpoint"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

const seriesSchema = z.object({
  name: z.string().min(1, "Series name is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.string().url("Invalid thumbnail URL").optional().or(z.literal("")),
  banner: z.string().url("Invalid banner URL").optional().or(z.literal("")),
})

type SeriesFormData = z.infer<typeof seriesSchema>

const SeriesDetailsPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data: seriesDetails } = useGetSeriesDetailsQuery(id || "")

  const form = useForm<SeriesFormData>({
    resolver: zodResolver(seriesSchema),

  })
  const { watch } = form

  const thumbnailUrl = watch("thumbnail")
  const bannerUrl = watch("banner")

  // TODO: Fetch series data using id
  console.log("Series ID:", id)

  const onSubmit = (data: SeriesFormData) => {
    // TODO: Implement save functionality
    console.log("Saving series data:", data)
  }

  return (
    <section className='w-full p-4'>
      <SectionCard className="w-full">
        <SectionHeader>
          Series Details
        </SectionHeader>
        <SectionContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Side - Thumbnail and Banner Preview */}
              <section className="space-y-4">
                <div className="space-y-2">
                  <Label>Thumbnail Preview</Label>
                  {seriesDetails?.data?.thumbnailUrl ? (
                    <img
                      src={seriesDetails.data.thumbnailUrl}
                      alt="Thumbnail"
                      className="w-full h-48 object-cover rounded-md border"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 rounded-md border flex items-center justify-center text-gray-400">
                      No thumbnail
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Banner Preview</Label>
                  {bannerUrl ? (
                    <img
                      src={bannerUrl}
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
            <section className="lg:col-span-2 space-y-4">
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
             
              
             
             
              <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </section>
          </div>
        </form>

        {/* Episodes Table */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Episodes</h3>
          <ControllableDataTable
            columns={episodeTableColumns}
            data={[]}
            actionButton={
              <Button>
                Add Episode
              </Button>
            }
          />
        </div>
      </SectionContent>
    </SectionCard>
    </section >
  )
}

export default SeriesDetailsPage
