"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import {Cell, Label, Pie, PieChart} from "recharts"

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

export function PieComponent({getData}) {
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
                        <defs>
                            <linearGradient id="PurpleDream" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#6a11cb" stopOpacity={1} />
                                <stop offset="100%" stopColor="#2575fc" stopOpacity={1} />
                            </linearGradient>

                            <linearGradient id="VioletPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#7f00ff" stopOpacity={1} />
                                <stop offset="100%" stopColor="#9b30ff" stopOpacity={1} />
                            </linearGradient>


                            <linearGradient id="MintBreeze" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00bfae" stopOpacity={1} />
                                <stop offset="100%" stopColor="#00e676" stopOpacity={1} />
                            </linearGradient>
                            <linearGradient id="ElectricLime" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00e676" stopOpacity={1} />
                                <stop offset="100%" stopColor="#64dd17" stopOpacity={1} />
                            </linearGradient>
                            <linearGradient id="LimeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#76ff03" stopOpacity={1} />
                                <stop offset="100%" stopColor="#00e676" stopOpacity={1} />
                            </linearGradient>
                            <linearGradient id="PurpleDreamGreenGlow" x1="0%" y1="0%" x2="100%" y2="100%">

                                <stop offset="0%" stopColor="#00e676" stopOpacity={1} />
                                <stop offset="100%" stopColor="#6a11cb" stopOpacity={1} />
                            </linearGradient>
                            <linearGradient id="DeepPurpleViolet" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#5D3F6E" stopOpacity={1} />
                                <stop offset="100%" stopColor="#8A2BE2" stopOpacity={1} />
                            </linearGradient>
                            <linearGradient id="OceanBlueToGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00d27e" stopOpacity={1} />  {/* Fresh Green */}
                                <stop offset="50%" stopColor="#00b0ff" stopOpacity={1} />  {/* Bright Blue */}
                                <stop offset="100%" stopColor="#005ac1" stopOpacity={1}/>
                            </linearGradient>
                            <linearGradient id="GreenToLightBlueBridge" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4caf50" stopOpacity={1} />  {/* Vibrant Green */}
                                <stop offset="50%" stopColor="#80e0e0" stopOpacity={1} />  {/* Light Blue */}
                                <stop offset="100%" stopColor="#00bcd4" stopOpacity={1} /> {/* Soft Cyan */}
                            </linearGradient>
                            <linearGradient id="BlueDream" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3f51b5" stopOpacity={1} />  {/* Deep Blue */}
                                <stop offset="100%" stopColor="#00bcd4" stopOpacity={1} /> {/* Light Cyan Blue */}
                            </linearGradient>
                            <linearGradient id="darkBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#00bcd4" stop-opacity="1" />
                                <stop offset="90%" stop-color="#0000ff" stop-opacity="1" />
                            </linearGradient>

                        </defs>
                        <Pie
                            data={getData}
                            dataKey="market_value"
                            nameKey="symbol"
                            innerRadius={70}
                            outerRadius={85}
                            strokeWidth={5}
                            label={({ value }) => Math.round(value)}
                            

                        >
                            <Cell fill="url(#PurpleDream)" />
                            <Cell fill="url(#VioletPurple)" />
                            <Cell fill="url(#DeepPurpleViolet)" />
                            <Cell fill="url(#PurpleDreamGreenGlow)" />
                            <Cell fill="url(#MintBreeze)" />
                            <Cell fill="url(#ElectricLime)" />
                            <Cell fill="url(#LimeGlow)" />
                            <Cell fill="url(#GreenToLightBlueBridge)" />
                            <Cell fill="url(#OceanBlueToGreen)" />
                            <Cell fill="url(#BlueDream)" />
                            <Cell fill="url(#darkBlue)" />
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
