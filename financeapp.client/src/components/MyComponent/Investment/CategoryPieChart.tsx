"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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
const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

export function PieComponent() {
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

    return (
        <Card className="border-none flex flex-col  w-full h-full items-center justify-center">
            <CardHeader className="items-center p-0 m-0 text-white ">
                <CardTitle>Portfolio</CardTitle>

            </CardHeader>
            <CardContent className="flex-1 pb-0 h-full w-full items-center justify-center flex ">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] min-h-[250px] "
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            label nameKey="browser"
                            innerRadius={70}
                            outerRadius={85}
                            strokeWidth={5}

                        >
                            <Label
                                value="Stocks"
                                position="center"
                                className="text-2xl font-bold text-white"
                            />

                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}
