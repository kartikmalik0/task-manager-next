"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useQuery } from "@tanstack/react-query"
import { getProjectData } from "@/actions/chart-data"


export function DasAreaChart() {



  const { data: chartData } = useQuery({
    queryKey: ["chartProjectData"],
    queryFn: async () => await getProjectData()
  })

  // const chartData = [
  //   { month: "January", desktop: 186, mobile: 80 },
  //   { month: "February", desktop: 305, mobile: 200 },
  //   { month: "March", desktop: 237, mobile: 120 },
  //   { month: "April", desktop: 73, mobile: 190 },
  //   { month: "May", desktop: 209, mobile: 130 },
  //   { month: "June", desktop: 214, mobile: 140 },
  // ]

  // console.log(chartData)
  const chartConfig = {
    count: {
      label: "Today Project Count",
      color: "hsl(var(--chart-1))",
    },
    prev3hourcount: {
      label: "Prev 3 Hour",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig


  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects in the Week</CardTitle>
        <CardDescription>
          Showing total Projects for the Week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="prev3hourcount"
              type="natural"
              fill="var(--color-prev3hourcount)"
              fillOpacity={0.4}
              stroke="var(--color-prev3hourcount)"
              stackId="a"
            />
            <Area
              dataKey="count"
              type="natural"
              fill="var(--color-count)"
              fillOpacity={0.4}
              stroke="var(--color-count)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - Dec 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
