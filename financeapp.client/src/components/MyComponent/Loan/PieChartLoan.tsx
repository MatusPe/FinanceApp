"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, LabelList, Pie, PieChart } from "recharts"

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

const mobileData = [
    { month: "january", mobile: 80, fill: "red" },
    { month: "february", mobile: 200, fill: "green" },
    { month: "march", mobile: 120, fill: "blue" },
    { month: "april", mobile: 190, fill: "yellow" },
    { month: "may", mobile: 130, fill: "cyan" },
]


function MonthlyPayment({innerRing, title, footer, DoublePie, DurationPie}) {


    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

    return (
        <Card className="flex flex-col h-full border-none">
            <CardHeader className="items-center pb-0 justify-center ">
                <CardTitle>{title}</CardTitle>

            </CardHeader>
            <CardContent className="flex-1 p-0 m-0  content-center ">
                <ChartContainer
                    config={chartConfig}
                    className="m-0 p-0 h-full w-full [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart className={'items-center m-0 p-0   justify-center '}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        {DoublePie&&<Pie
                            data={mobileData}
                            dataKey="mobile"
                            innerRadius={0}
                            outerRadius={`60%`}
                        />}
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={`${innerRing}%`}
                            outerRadius={"95%"}
                            strokeWidth={1}
                        >

                            <LabelList
                                dataKey="visitors"
                                className="fill-background font-bold text-white z-100"
                                stroke="none"
                                fontSize={15}
                                style={{fill: 'white'}}


                                formatter={(value: keyof typeof  chartData) =>{
                                    return `${(value/(totalVisitors/100)).toFixed(0)}%`
                                }

                                }
                            />

                            {!DurationPie&&<Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    style={{fill: 'white'}}
                                                    className="fill-foreground text-3xl font-bold  "
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Visitors
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />}
                        </Pie>

                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm h-sm:hidden">

                <div className="leading-none text-muted-foreground">
                    {footer}
                </div>
            </CardFooter>
        </Card>
    )
}
export default MonthlyPayment