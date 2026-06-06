import { useParams, useNavigate } from "react-router"
import { SectionCard, SectionContent, SectionHeader } from "@/components/ui/section-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft01Icon, UserAccountIcon, Mail01Icon, AiPhone01Icon, Calendar01Icon, Shield01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useGetUserByIdQuery } from "../api/userManagement/userManagement.endpoint"

const UserDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: user, isLoading } = useGetUserByIdQuery(id || "")

  if (isLoading) {
    return (
      <section className='w-full p-4'>
        <SectionCard className="w-full">
          <SectionContent>
            <div className="flex items-center justify-center py-8">
              <p>Loading...</p>
            </div>
          </SectionContent>
        </SectionCard>
      </section>
    )
  }

  if (!user) {
    return (
      <section className='w-full p-4'>
        <SectionCard className="w-full">
          <SectionContent>
            <div className="flex items-center justify-center py-8">
              <p>User not found</p>
            </div>
          </SectionContent>
        </SectionCard>
      </section>
    )
  }

  return (
    <section className='w-full p-4'>
      <SectionCard className="w-full">
        <SectionHeader>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/users")}
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} />
            </Button>
            <span>User Details</span>
          </div>
        </SectionHeader>
        <SectionContent>
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-center gap-6 pb-6 border-b">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <HugeiconsIcon icon={UserAccountIcon} className="w-12 h-12 text-gray-500" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
                <div className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${user.isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                  <HugeiconsIcon icon={Shield01Icon} className="w-4 h-4" />
                  {user.isBlocked ? "Blocked" : "Active"}
                </div>
              </div>
            </div>

            {/* User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>

                <div className="flex items-start gap-3">
                  <HugeiconsIcon icon={UserAccountIcon} className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HugeiconsIcon icon={Mail01Icon} className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HugeiconsIcon icon={AiPhone01Icon} className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{user.phoneNumber || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HugeiconsIcon icon={Calendar01Icon} className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Joined On</p>
                    <p className="font-medium">{new Date(user.joinedOn).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Information</h3>

                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{user.age || "Not provided"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">{user.gender || "Not provided"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="font-medium text-sm">{user.id}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t">
              <Button>Edit User</Button>
              <Button variant={user.isBlocked ? "outline" : "destructive"}>
                {user.isBlocked ? "Unblock User" : "Block User"}
              </Button>
            </div>
          </div>
        </SectionContent>
      </SectionCard>
    </section>
  )
}

export default UserDetailsPage
