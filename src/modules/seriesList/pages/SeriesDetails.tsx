import { SectionCard, SectionContent, SectionHeader } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ControllableDataTable } from "@/components/ui/controllable-data-table"
import { episodeTableColumns } from "../../episodeList/components/tables/episodeTableColumns"
import { useParams } from "react-router"
import { useState } from "react"

const SeriesDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    thumbnail: "",
    banner: "",
  })

  // TODO: Fetch series data using id
  console.log("Series ID:", id)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving series data:", formData)
  }

  return (
    <section className='w-full p-4'>
      <SectionCard className="w-full">
        <SectionHeader>
          Series Details
        </SectionHeader>
        <SectionContent>
          <div className="space-y-6">
            {/* Series Details Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Series Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter series name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleInputChange}
                  placeholder="Enter thumbnail URL"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="banner">Banner URL</Label>
                <Input
                  id="banner"
                  name="banner"
                  value={formData.banner}
                  onChange={handleInputChange}
                  placeholder="Enter banner URL"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter series description"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>

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
          </div>
        </SectionContent>
      </SectionCard>
    </section>
  )
}

export default SeriesDetailsPage
