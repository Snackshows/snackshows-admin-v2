import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const DashboardPage = () => {
  return (

    <section className="w-full flex flex-col gap-4 ">
      
      <section className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Total Users</CardDescription>
          </CardHeader>
          <CardContent>
            <p>100</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Total Users</CardDescription>
          </CardHeader>
          <CardContent>
            <p>100</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Total Users</CardDescription>
          </CardHeader>
          <CardContent>
            <p>100</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Total Users</CardDescription>
          </CardHeader>
          <CardContent>
            <p>100</p>
          </CardContent>
        </Card>

      </section>
      <section className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Total Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <p>100</p>
          </CardContent>
        </Card>


      </section>


    </section>

  )
}

export default DashboardPage