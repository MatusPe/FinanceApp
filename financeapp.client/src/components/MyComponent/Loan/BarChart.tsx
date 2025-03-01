"use client"

import { TrendingUp } from "lucide-react"
import {Bar, BarChart, CartesianGrid, XAxis, YAxis} from "recharts"
import {GraphButtons} from './Buttons.jsx'

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
import React from "react"
const chartData = [
    { month: "TatraBanka",TotalBorrowed:25000, TotalRemining:15000,Mounthly:400, IR: 5, Duration:30},
    { month: "VUB Banka",TotalBorrowed:500,TotalRemining:400, Mounthly:50, IR: 4.6, Duration:10},
    { month: "Slovenska sporitelna",TotalBorrowed:1000, TotalRemining:900,Mounthly:100, IR: 8, Duration:10},
    { month: "Slovenska posta",TotalBorrowed:15000,TotalRemining:5000, Mounthly:500, IR: 2, Duration:30},
    { month: "Fio Banka",TotalBorrowed:6000, TotalRemining:3000,Mounthly:300, IR: 1, Duration:10},
    { month: "Raichshen Banka",TotalBorrowed:200, TotalRemining:150, Mounthly:10, IR: 0.5, Duration:20},
]

const chartConfig = {
    TotalBorrowed: {
        label: "Total Borrowed",
        color: "green-500",

    },
    TotalRemining: {
        label: "Total remaining",
        color: "red-700",

    },
    Mounthly: {
        label: "Mounthly Payment",

    },
    IR: {
        label: "Interasted Rate",

    },
    Duration: {
        label: "Duration",

    },
} satisfies ChartConfig

function BarChartComponent() {
    return (
        <Card className="flex flex-col w-full h-full  border-none">
            <CardHeader className="flex-row justify-between   p-3">
                <CardTitle className={'text-white '}>Comparison of active loans</CardTitle>

            </CardHeader>
            <CardContent className=" h-[90%] w-full flex-grow   ">
                <ChartContainer config={chartConfig} className=" m-0 p-0  w-full  h-[95%] flex-grow">
                    <BarChart accessibilityLayer data={chartData} className="  p-0 m-0 h-full w-full">
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={5}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis yAxisId="borrowed" tick={false} axisLine={false} hide={true}/>
                        <YAxis yAxisId="remain" tick={false} axisLine={false} hide={true}/>
                        <YAxis yAxisId="mounthly" tick={false} axisLine={false} hide={true}/>
                        <YAxis yAxisId="IR" tick={false} axisLine={false} hide={true}/>
                        <YAxis yAxisId="Duration" tick={false} axisLine={false} hide={true} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="TotalBorrowed" fill="rgba(0, 255, 0, 1)" radius={4} yAxisId="borrowed" />
                        <Bar dataKey="TotalRemining" fill="rgba(255, 0, 0, 1)" radius={4} yAxisId="remain" />
                        <Bar dataKey="Mounthly" fill="rgba(0, 255, 255, 1)" radius={4} yAxisId="mounthly"/>
                        <Bar dataKey="IR" fill="rgba(0, 0, 255, 1)" radius={4} yAxisId="IR" />
                        <Bar dataKey="Duration" fill="rgba(191, 0, 255, 1)" radius={4} yAxisId="Duration"
                              />
                    </BarChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}
export default BarChartComponent