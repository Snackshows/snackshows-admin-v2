import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetDashboardOverviewDataQuery } from "../api/dashboardOverview.endpoint"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { HugeiconsIcon } from "@hugeicons/react"
import { Dollar02Icon, Film02Icon, PlayListIcon, UserIcon } from "@hugeicons/core-free-icons"

// const chartConfig = {
//   revenue: {
//     label: "Revenue",
//     color: "hsl(var(--chart-1))",
//   },
//   users: {
//     label: "Users",
//     color: "hsl(var(--chart-2))",
//   },
//   videos: {
//     label: "Videos",
//     color: "hsl(var(--chart-3))",
//   },
//   series: {
//     label: "Series",
//     color: "hsl(var(--chart-4))",
//   },
// } as const

const DashboardPage = () => {
  const { data: dashboardData, isLoading, error } = useGetDashboardOverviewDataQuery()

  if (isLoading) {
    return <div className="p-8">Loading...</div>
  }

  if (error) {
    return <div className="p-8 text-red-500">Error loading dashboard data</div>
  }

  const stats = dashboardData?.data?.stats
  const latestUsers = dashboardData?.data?.latestUsers || []
  const latestVideos = dashboardData?.data?.latestVideos || []

  // Mock data for charts (since API doesn't provide this data yet)
  // const revenueData = [
  //   { month: "Jan", revenue: 4000 },
  //   { month: "Feb", revenue: 3000 },
  //   { month: "Mar", revenue: 5000 },
  //   { month: "Apr", revenue: 4500 },
  //   { month: "May", revenue: 6000 },
  //   { month: "Jun", revenue: 5500 },
  // ]

  // const coinsData = [
  //   { name: "Free Coins", value: 400, color: "#0088FE" },
  //   { name: "Premium Coins", value: 300, color: "#00C49F" },
  //   { name: "Bonus Coins", value: 200, color: "#FFBB28" },
  //   { name: "Gift Coins", value: 100, color: "#FF8042" },
  // ]

  // const topSeriesData = [
  //   { name: "Demon Slayer", views: 12500, revenue: 2500 },
  //   { name: "Attack on Titan", views: 10200, revenue: 2040 },
  //   { name: "One Piece", views: 9800, revenue: 1960 },
  //   { name: "Jujutsu Kaisen", views: 8500, revenue: 1700 },
  //   { name: "My Hero Academia", views: 7200, revenue: 1440 },
  // ]

  return (
    <section className="w-full flex flex-col gap-4 p-6">

      <section className="w-full flex flex-col  items-start justify-between">
        <span className="text-2xl font-bold">Dashboard Overview</span>
        <p className="text-sm font-medium text-muted-foreground">Monitor Your Content Performance And Revenue Metrics</p>

      </section>
      {/* Stats Cards */}

      <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <StatusCard title="TOTAL USERS" value={`${stats?.totalUsers || 0}`} icon={<div className=" rounded-xl w-10 h-10 flex items-center justify-center p-2 aspect-square bg-amber-400">
          <HugeiconsIcon icon={UserIcon} />
        </div>} />
        {/* Total Series */}
        <StatusCard title="TOTAL SERIES" value={`${stats?.totalSeries || 0}`} icon={<div className=" rounded-xl w-10 h-10 flex items-center justify-center p-2 aspect-square bg-orange-400">
          <HugeiconsIcon icon={Film02Icon} />
        </div>} />
        {/* Total Episodes */}
        <StatusCard title="TOTAL EPISODES" value={`${stats?.totalVideos || 0}`} icon={<div className=" rounded-xl w-10 h-10 flex items-center justify-center p-2 aspect-square bg-blue-400">
          <HugeiconsIcon icon={PlayListIcon} />
        </div>} />
        {/* Total Revenue */}
        <StatusCard title="TOTAL REVENUE" value={`$ ${stats?.totalRevenue || 0}`} icon={<div className=" rounded-xl w-10 h-10 flex items-center justify-center p-2 aspect-square bg-green-400">
          <HugeiconsIcon icon={Dollar02Icon} />
        </div>} />


      </section>

      {/* Charts Section */}
      {/* <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Trend Chart 
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Coins Breakdown Chart 
        <Card>
          <CardHeader>
            <CardTitle>Coins Breakdown</CardTitle>
            <CardDescription>Distribution of coin types</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={coinsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {coinsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </section> */}
      {/* Latest Videos */}
      <section className="w-full">
        
      </section>

      {/* Tables Section */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Performing Videos */}
        <Card className="lg:col-span-2 bg-secondary">
          <CardHeader>
            <CardTitle>Latest Videos</CardTitle>
            <CardDescription>Recently uploaded videos</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Video ID</TableHead>
                  <TableHead>Thumbnail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestVideos.slice(0, 5).map((video) => (
                  <TableRow key={video.id}>
                    <TableCell className="font-medium text-xs">{video.id}</TableCell>
                    <TableCell className="text-xs">{video.thumbnail}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {/* Top Performing Series
        <Card className="lg:col-span-2 bg-secondary">
          <CardHeader>
            <CardTitle>Top Performing Series</CardTitle>
            <CardDescription>Series with highest views and revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Series Name</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSeriesData.map((series) => (
                  <TableRow key={series.name}>
                    <TableCell className="font-medium">{series.name}</TableCell>
                    <TableCell>{series.views.toLocaleString()}</TableCell>
                    <TableCell>${series.revenue.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card> */}

        {/* Latest Users */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Users</CardTitle>
            <CardDescription>Recently registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestUsers.slice(0, 5).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-xs">{user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      

    </section>
  )
}

export default DashboardPage



const StatusCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => {
  return (
    <div className="w-full h-fit bg-secondary  flex flex-col border p-6 rounded-2xl gap-2 hover:shadow-lg transition-shadow">
      <section className="w-full flex items-center justify-between">
        {/* Header */}
        <section className="flex flex-col gap-1">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-2xl font-bold">{value}</span>
        </section>
        {icon && (
          <div className=" rounded-xl w-10 h-10 flex items-center justify-center p-2 aspect-square bg-amber-400">
            {icon}
          </div>
        )}

      </section>
    </div>
  )
}