"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

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
const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig

export function BarComponent({investmentbymonth}) {


    const [news, setNews] = useState([])
    const [data, setData] = useState([])
    const [first, setFirst] = useState(true)
    useEffect(() => {

        const allMonths = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // Convert investmentbymonth into a map for fast lookup
        const dataMap = investmentbymonth.reduce((acc, item) => {
            acc[item.month] = item;
            return acc;
        }, {});

        // Ensure each month exists, filling missing months with empty data
        const filledData = allMonths.map((month) => {
            // If data for the month exists, keep it; otherwise, add an empty object
            return dataMap[month] || { month, invested: 0 };
        });

        setNews(filledData);
        
        setData(filledData.slice(0,6));


    }, [investmentbymonth])
    
    
    const handleclick=()=>{
        if(first==true){
            setData(news.slice(0,6));
            setFirst(false)
        }else if(first==false){
            setData(news.slice(6));
            setFirst(true)
        }
    }
    
    return (
        <div><button
            className=" absolute right-5 top-6 border-2 border-green-500 h-8 w-8 bg-black text-center justify-center text-white font-bold  rounded-lg shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-1 rounded-r-2xl mt-1 ml-0.5 rounded-bl-2xl"
            aria-hidden="true"
            onClick={() => {handleclick()}}
        >&gt;
        </button>

            <button
                className=" absolute right-14 top-6 border-2 border-green-500 rounded-br-2xl h-8 w-8 mt-1 ml-1 text-center bg-black text-white font-bold rounded-lg shadow-lg transition-all duration-300  hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-1 rounded-l-2xl" aria-hidden="true"

                onClick={() => {handleclick()}}>
                &lt;
            </button>
        <Card className={'border-none'}>
            <CardHeader className={'text-white'}>
                <CardTitle>Stocks price</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={data}
                        layout="vertical"
                        margin={{
                            
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="month"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey="invested" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="invested"
                            layout="vertical"
                            fill="#22c55e"
                            radius={4}
                        >
                            <LabelList
                                dataKey="month"
                                position="right"
                                offset={5}
                                className="fill-white"
                                fontSize={12}
                                style={{ maxWidth: '50px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                
                                
                            />
                            <LabelList
                                dataKey="invested"
                                position="insideleft"
                                offset={0}
                                className="fill-white"
                                fontSize={12}
                                formatter={(value) => value === 0 ? null : `${Math.round(value)}$`}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>

        </Card>
        </div>
    )
}