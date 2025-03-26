"use client"

import { TrendingUp } from "lucide-react"
import {Cell, PolarAngleAxis, PolarGrid, Radar, RadarChart} from "recharts"
import {ButtonArrowRight, ButtonArrowLeft} from './ButtonArrows'

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

import {GetTwoExpensesApi} from "../Services/ApiService";


const chartConfig = {
    amountMonth: {
        label: "Current Month",
        color: "rgb(64, 224, 208)",
        
    },
    amountTargetMonth: {
        label: "Target Month",
        color: "rgb(255, 0, 0)",
        
    },
} satisfies ChartConfig









function RadarComponent() {
    const [ChartData, setChartData] = useState([])

    const [selectedDate, setSelectedDate] = useState(() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        console.log('letsgoo');
        return date;
    });

    function HandleSelect(number) {
        const currentDate = new Date();

        if((selectedDate.getMonth() >= currentDate.getMonth()&&selectedDate.getFullYear() == currentDate.getFullYear()&&number!=-1) || selectedDate.getFullYear() > currentDate.getFullYear()) { return}
        setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + number)));

    }

    useEffect(() => {
        const GetData= async ()=>{
            try {
                console.log(selectedDate);
                console.log("madness");
                console.log(selectedDate.getMonth());
                var data=await GetTwoExpensesApi(selectedDate.getMonth()+1, selectedDate.getFullYear());
                console.log(data, 'madman');
                setChartData(data);
            }catch (error) {
                console.error("Error fetching month expenses:", error);
            }
            
        }
        GetData();
        
    }, [selectedDate]);


    const normalizedData = ChartData.map(data => {
        const maxValue = Math.max(data.amountMonth, data.amountTargetMonth); // Find the maximum value in the current category
        return {
            category: data.category,
            amountMonth: data.amountMonth / maxValue, // Normalize amountMonth
            amountTargetMonth: data.amountTargetMonth / maxValue, // Normalize amountTargetMonth
        };
    });

    
    
    
    return (



        <Card className=" w-full h-full items-center border-none">
            <ButtonArrowLeft onClick={() => {HandleSelect(-1)}}></ButtonArrowLeft>
            <ButtonArrowRight onClick={() => {HandleSelect(1)}}></ButtonArrowRight>

            <CardHeader className=" items-center h-[10%] mt-0 pt-0">

                <CardDescription>
                    Comparison of Two Months in Expenses
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-0  ">
                <ChartContainer
                    config={chartConfig}
                    className=" w-full h-full pb-0 mx-auto min-h-full min-w-full p-0 m-0"
                >
                    <RadarChart data={normalizedData} className=" w-full h-full p-0 m-0  ">
                        <defs>
                            <linearGradient id="BoldRadarGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FF0000" stopOpacity="1" /> 
                                <stop offset="100%" stopColor="#B22222" stopOpacity="1" />
                            </linearGradient>

                            <linearGradient id="BoldRadarGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#0000FF" stopOpacity="1" /> 
                                <stop offset="100%" stopColor="#1E90FF" stopOpacity="1" />
                            </linearGradient>


                            

                        </defs>
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    hideLabel
                                    formatter={(value, name, item, index) => {
                                        const originalData = ChartData.find(data => data.category === item.payload.category);
                                        console.log(originalData, 'this is it')
                                        console.log(item);
                                        console.log(name, 'hakalo');
                                        return (
                                            <>
                                                <div
                                                    className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                                                    style={
                                                        {
                                                            "--color-bg": `var(--color-${name})`,
                                                        } as React.CSSProperties
                                                    }
                                                />
                                                {chartConfig[name as keyof typeof chartConfig]?.label || name}
                                                <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                                    {originalData && originalData[name === 'amountMonth' ? 'amountMonth' : 'amountTargetMonth']}
                                                </div>
                                            </>
                                        );
                                    }}
                                />
                            }
                        />
                        <PolarAngleAxis dataKey="category" />
                        <PolarGrid  stroke="white" opacity={'0.4'}/>
                        <Radar
                            dataKey="amountMonth"
                            fill="url(#BoldRadarGradient1)"
                            fillOpacity={1}
                        />
                        <Cell fill="url(#BoldRadarGradient)" />
                        <Cell fill="url(#BrightOrangeRed)" />
                        <Radar dataKey="amountTargetMonth" fill="url(#BoldRadarGradient2)" fillOpacity={0.7} />
                        
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">

                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    {`${new Date(selectedDate).toLocaleString('en-US', { month: 'short' })}-${new Date().toLocaleString('en-US', { month: 'short' })}: ${selectedDate.getFullYear()}`}
                </div>
            </CardFooter>

        </Card>


    )


}

export default RadarComponent




