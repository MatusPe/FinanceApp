"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
    { month: "January", desktop: 186, mobile: 80, tablet: 50, other: 20 },
    { month: "February", desktop: 305, mobile: 200, tablet: 90, other: 30 },
    { month: "March", desktop: 237, mobile: 120, tablet: 70, other: 25 },
    { month: "April", desktop: 73, mobile: 190, tablet: 65, other: 15 },
    { month: "May", desktop: 209, mobile: 130, tablet: 85, other: 22 },
    { month: "June", desktop: 214, mobile: 140, tablet: 95, other: 28 },
    { month: "July", desktop: 195, mobile: 150, tablet: 75, other: 18 },
    { month: "August", desktop: 250, mobile: 170, tablet: 100, other: 35 },
    { month: "September", desktop: 180, mobile: 160, tablet: 80, other: 27 },
    { month: "October", desktop: 230, mobile: 175, tablet: 85, other: 30 },
    { month: "November", desktop: 260, mobile: 190, tablet: 90, other: 32 },
    { month: "December", desktop: 300, mobile: 210, tablet: 110, other: 40 },
];


const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function MultipleComponent({header}) {


    const headervalue=()=>{


        if(header == false){
            return "Pure Profit comparison"
        }else{
            return "Percentual Profit comparison"
        }
    }

    const lineKeys = Object.keys(chartData[0]).slice(1);
    const LINE_COLORS = [
        "#ff5733", "#33ff57", "#3357ff", "#ff33a1", "#f39c12", "#9b59b6",
        "#2ecc71", "#e74c3c", "#3498db", "#1abc9c", "#e67e22", "#95a5a6"
    ];


    return (
        <Card className=" h-full border-none ">
            <CardHeader className={'text-white'}>
                <CardTitle >{headervalue()}</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="mt-0 w-full h-full mx-auto my-auto">
                <ChartContainer config={chartConfig} className="w-[100%] h-[60%] mx-auto my-auto">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}

                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        {lineKeys.map((key, index) => (
                            <Line
                                key={key}
                                dataKey={key}
                                type="monotone"
                                stroke={LINE_COLORS[index % LINE_COLORS.length]} // Dynamically assign color
                                strokeWidth={2}
                                dot={false}
                            />
                        ))}
                    </LineChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}