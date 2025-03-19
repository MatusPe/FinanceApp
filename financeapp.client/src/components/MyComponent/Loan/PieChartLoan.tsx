"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import {Cell, Label, LabelList, Pie, PieChart} from "recharts"

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
import {useEffect} from "react";
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


function MonthlyPayment({innerRing, title, footer, DoublePie, DurationPie, getData, setData}) {


    
    
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])
    const [KeyName, setKeyName] = React.useState<string>()
    const [value, setValue] = React.useState<string>()


    
    useEffect(() => {
        console.log(getData)
        if (getData) {  // ✅ Ensure getData exists to prevent runtime errors
            if (DoublePie) {
                setKeyName(getData.loadName);
                setValue("monthlyPayment");
            } else if (DurationPie) {
                setKeyName(getData.loadName);
                setValue("term");
            } else {
                setKeyName(getData.loadName);
                setValue("totalSpent");
            }
        }

    },[getData])

    const chartColors = [
        "red",   // 1st slice color
        "white", // 2nd slice color
        "black", // 3rd slice color
        "blue",  // 4th slice color
        "pink",  // 5th slice color
    ];

    return (
        <Card className="flex flex-col h-full border-none">
            <CardHeader className="items-center pb-0 justify-center ">
                <CardTitle className={'text-white'}>{title}</CardTitle>

            </CardHeader>
            <CardContent className="flex-1 p-0 m-0  content-center ">
                <ChartContainer
                    config={chartConfig}
                    className="m-0 p-0 h-full w-full [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart className={'items-center m-0 p-0   justify-center '}>

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
                        
                        
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        {DoublePie&&<Pie
                            data={getData}
                            dataKey="ir"
                            nameKey="loanName"
                            innerRadius={0}
                            outerRadius={`60%`}
                        >
                            <Cell fill="url(#PurpleDream)" />
                            <Cell fill="url(#BlueDream)" />
                            <Cell fill="url(#PurpleDreamGreenGlow)" />
                            <Cell fill="url(#MintBreeze)" />
                            <Cell fill="url(#ElectricLime)" />
                            
                            
                        </Pie>}
                        <Pie
                            data={getData}
                            dataKey={value}
                            nameKey="loanName"
                            innerRadius={`${innerRing}%`}
                            outerRadius={"95%"}
                            strokeWidth={1}
                        >
                            
                            <Cell fill="url(#PurpleDream)" />
                            <Cell fill="url(#BlueDream)" />
                            <Cell fill="url(#PurpleDreamGreenGlow)" />
                            <Cell fill="url(#MintBreeze)" />
                            <Cell fill="url(#ElectricLime)" />
                            

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

                <div className="leading-none text-muted-foreground font-bold">
                    {footer}
                </div>
            </CardFooter>
        </Card>
    )
}
export default MonthlyPayment