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
import React, {useEffect, useState} from "react"


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

export function LineComponentInvestment({header, getData}) {

    
    const [chartData, setChartData] = useState<ChartConfig>()
    const [graphTitleData, setgraphTitleData] = useState<string>()
    useEffect(() => {
        
        setChartData(getData)
    }, [getData]);
    useEffect(() => {
        if(header=="Money Profit") {
            setgraphTitleData("totalProfitLoss")
        }else{
            setgraphTitleData("totalProfitLossPct")
        }
    }, []);
    
    return (
        <Card className={'border-none'}>
            <CardHeader>
                <CardTitle>{header}</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
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
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey={graphTitleData}
                            type="natural"
                            stroke="#22c55e"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-desktop)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}
