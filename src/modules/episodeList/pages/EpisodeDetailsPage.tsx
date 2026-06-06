import { useState } from "react"
import { useParams, useNavigate } from "react-router"
import { SectionCard, SectionContent, SectionHeader } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Field, FieldGroup, FieldLabel, FieldContent } from "@/components/ui/field"
import { useGetEpisodesQuery, useUpdateEpisodeMutation } from "../api/episodeManagement/episodeManagement.endpoint"

const EpisodeDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: episodes } = useGetEpisodesQuery()
  const updateMutation = useUpdateEpisodeMutation()

  const episode = episodes?.find(ep => ep.id === id)

  const [formData, setFormData] = useState({
    thumbnail: episode?.thumbnail || "",
    title: episode?.title || "",
    description: episode?.description || "",
    duration: episode?.duration || 0,
    isLocked: episode?.isLocked || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (id) {
      updateMutation.mutate(
        { id, data: formData },
        {
          onSuccess: () => {
            navigate("/episodes")
          },
        }
      )
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!episode) {
    return <div className="p-4">Episode not found</div>
  }

  return (
    <section className='w-full p-4'>
      <SectionCard className="w-full max-w-2xl mx-auto">
        <SectionHeader>
          Update Episode
        </SectionHeader>
        <SectionContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="thumbnail">Thumbnail URL</FieldLabel>
                <FieldContent>
                  <Input
                    id="thumbnail"
                    value={formData.thumbnail}
                    onChange={(e) => handleInputChange("thumbnail", e.target.value)}
                    placeholder="Enter thumbnail URL"
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <FieldContent>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter episode title"
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <FieldContent>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Enter episode description"
                    className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="duration">Duration (seconds)</FieldLabel>
                <FieldContent>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", parseInt(e.target.value) || 0)}
                    placeholder="Enter duration in seconds"
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel htmlFor="isLocked">Lock Status</FieldLabel>
                <FieldContent>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isLocked"
                      checked={formData.isLocked}
                      onCheckedChange={(checked) => handleInputChange("isLocked", checked)}
                    />
                    <Label htmlFor="isLocked">{formData.isLocked ? "Locked" : "Unlocked"}</Label>
                  </div>
                </FieldContent>
              </Field>
            </FieldGroup>

            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/episodes")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Updating..." : "Update Episode"}
              </Button>
            </div>
          </form>
        </SectionContent>
      </SectionCard>
    </section>
  )
}

export default EpisodeDetailsPage
