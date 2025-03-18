"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {useEffect, useState} from "react";
import {GetAllExpensesLoanbyUserApi} from "../Services/ApiServiceLoan.jsx";
const chartData = [
    { date: "2025-01-01", desktop: 222, mobile: 150 },
    { date: "2025-02-02", desktop: 97, mobile: 180 },
    { date: "2025-02-03", desktop: 167, mobile: 120 },
    { date: "2025-02-04", desktop: 242, mobile: 260 },
    { date: "2025-02-05", desktop: 373, mobile: 290 },
    { date: "2025-02-06", desktop: 301, mobile: 340 },
    { date: "2025-02-07", desktop: 245, mobile: 180 },
    { date: "2025-02-08", desktop: 409, mobile: 320 },
    { date: "2025-02-09", desktop: 59, mobile: 110 },
    { date: "2025-02-10", desktop: 261, mobile: 190 },
    { date: "2025-03-11", desktop: 327, mobile: 350 },
    { date: "2025-03-12", desktop: 292, mobile: 210 },
    { date: "2025-03-13", desktop: 342, mobile: 380 },
    { date: "2025-03-14", desktop: 137, mobile: 220 },
    { date: "2025-03-15", desktop: 120, mobile: 170 },
    { date: "2025-03-16", desktop: 138, mobile: 190 },
    { date: "2025-03-17", desktop: 446, mobile: 360 },
    { date: "2025-03-18", desktop: 364, mobile: 410 },
    { date: "2025-04-19", desktop: 243, mobile: 180 },
    { date: "2025-04-20", desktop: 89, mobile: 150 },
    { date: "2025-04-21", desktop: 137, mobile: 200 },
    { date: "2025-04-22", desktop: 224, mobile: 170 },
    { date: "2025-04-23", desktop: 138, mobile: 230 },
    { date: "2025-04-24", desktop: 387, mobile: 290 },
    { date: "2025-04-25", desktop: 215, mobile: 250 },
    { date: "2025-04-26", desktop: 75, mobile: 130 },
    { date: "2025-04-27", desktop: 383, mobile: 420 },
    { date: "2025-04-28", desktop: 122, mobile: 180 },
    { date: "2025-04-29", desktop: 315, mobile: 240 },
    { date: "2025-04-30", desktop: 454, mobile: 380 },
    { date: "2025-05-01", desktop: 165, mobile: 220 },
    { date: "2025-05-02", desktop: 293, mobile: 310 },
    { date: "2025-05-03", desktop: 247, mobile: 190 },
    { date: "2025-05-04", desktop: 385, mobile: 420 },
    { date: "2025-05-05", desktop: 481, mobile: 390 },
    { date: "2025-05-06", desktop: 498, mobile: 520 },
    { date: "2025-05-07", desktop: 388, mobile: 300 },
    { date: "2025-05-08", desktop: 149, mobile: 210 },
    { date: "2025-05-09", desktop: 227, mobile: 180 },
    { date: "2025-05-10", desktop: 293, mobile: 330 },
    { date: "2025-05-11", desktop: 335, mobile: 270 },
    { date: "2025-05-12", desktop: 197, mobile: 240 },
    { date: "2025-05-13", desktop: 197, mobile: 160 },
    { date: "2025-05-14", desktop: 448, mobile: 490 },
    { date: "2025-05-15", desktop: 473, mobile: 380 },
    { date: "2025-05-16", desktop: 338, mobile: 400 },
    { date: "2025-05-17", desktop: 499, mobile: 420 },
    { date: "2025-05-18", desktop: 315, mobile: 350 },
    { date: "2025-05-19", desktop: 235, mobile: 180 },
    { date: "2025-05-20", desktop: 177, mobile: 230 },
    { date: "2025-05-21", desktop: 82, mobile: 140 },
    { date: "2025-05-22", desktop: 81, mobile: 120 },
    { date: "2025-05-23", desktop: 252, mobile: 290 },
    { date: "2025-05-24", desktop: 294, mobile: 220 },
    { date: "2025-05-25", desktop: 201, mobile: 250 },
    { date: "2025-05-26", desktop: 213, mobile: 170 },
    { date: "2025-05-27", desktop: 420, mobile: 460 },
    { date: "2025-05-28", desktop: 233, mobile: 190 },
    { date: "2025-05-29", desktop: 78, mobile: 130 },
    { date: "2025-05-30", mobile: 280 },
    { date: "2025-05-31", mobile: 230 },
    { date: "2025-06-01",  mobile: 200 },
    { date: "2025-06-02",  mobile: 410 },
    { date: "2025-06-03", mobile: 160 },
    { date: "2025-06-04",  mobile: 380 },
    { date: "2025-06-05",  mobile: 140 },
    { date: "2025-06-06",  mobile: 250 },
    { date: "2025-06-07", desktop: 323, mobile: 370 },
    { date: "2025-06-08", desktop: 385, mobile: 320 },
    
    { date: "2025-06-13", desktop: 81, mobile: 130 },
    { date: "2025-06-14", desktop: 426, mobile: 380 },
    
    
    
    
    { date: "2025-06-19", desktop: 341, mobile: 290 },
    
    { date: "2025-06-21", desktop: 169, mobile: 210 },
    
    { date: "2025-06-23", desktop: 480, mobile: 530 },
    { date: "2025-06-24", desktop: 132, mobile: 180 },
    
    { date: "2025-06-26", desktop: 434, mobile: 380 },
    { date: "2025-06-27", desktop: 448, mobile: 490 },
    { date: "2025-06-28", desktop: 149, mobile: 200 },
    { date: "2025-06-29", desktop: 103, mobile: 160 },
    { date: "2025-06-30", desktop: 446, mobile: 400 },
]


const chartDataone = [
    { date: "2024-04-01",  mobile: 150 },
    { date: "2024-04-02",  mobile: 180 },
    { date: "2024-04-03", mobile: 120 },
    { date: "2024-04-04",  mobile: 260 },
    { date: "2024-04-05",  mobile: 290 },
    { date: "2024-04-06", mobile: 340 },
    { date: "2024-04-07",  mobile: 180 },
    { date: "2024-04-08",  mobile: 320 },
    { date: "2024-04-09", mobile: 110 },
    { date: "2024-04-10",  mobile: 190 },
    { date: "2024-04-11", mobile: 350 },
    { date: "2024-04-12", mobile: 210 },
    { date: "2024-04-13",  mobile: 380 },
    { date: "2024-04-14",  mobile: 220 },
    { date: "2024-04-15",  mobile: 170 },
    { date: "2024-04-16",  mobile: 190 },
    { date: "2024-04-17", mobile: 360 },
    { date: "2024-04-18",  mobile: 410 },
    { date: "2024-04-19",  mobile: 180 },
    { date: "2024-04-20",  mobile: 150 },
    { date: "2024-04-21",  mobile: 200 },
    { date: "2024-04-22",  mobile: 170 },
    { date: "2024-04-23",  mobile: 230 },
    { date: "2024-04-24",  mobile: 290 },
    { date: "2024-04-25",  mobile: 250 },
    { date: "2025-04-26",  mobile: 130 },
    { date: "2025-04-27",  mobile: 420 },
    { date: "2025-04-28",  mobile: 180 },
    { date: "2025-04-29",  mobile: 240 },
    { date: "2025-04-30",  mobile: 380 }
    
    ]

const chartConfig = {
    views: {
        label: "Page Views",
    },
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

function TimeLineLoan({ListLoanId}) {
    const [loanNames, setLoanNames] = useState(new Set());
    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("desktop")

    const total = React.useMemo(
        () => ({
            desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
            mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
        }),
        []
    )
    const [getData, setData] = React.useState<any[]>([]);


    const mergeByDate = (data) => {
        return data.reduce((acc, curr) => {
            const date = curr.date.split('T')[0]; // Extract date without time
            if (!acc[date]) {
                acc[date] = { date }; // Initialize with date field
            }
            // Capitalize the loan name (Lightbringer, Darkbringer, etc.)
            const loanName = curr.loanName.charAt(0).toUpperCase() + curr.loanName.slice(1);
            setLoanNames((prevSet) => new Set([...prevSet, loanName]));

            if (!acc[date][loanName]) {
                acc[date][loanName] = 0;
            }
            acc[date][loanName] += curr.amount; // Merge by adding the amounts
            return acc;
        }, {});
    };

    

// Convert merged data into an array and remove the date key from the main object
    


    useEffect(() => {
        console.log("list of loandsid", ListLoanId);
        GetAllExpensesLoanbyUserApi("string",ListLoanId).then(data=>{
            console.log(data)
            setData(data.data)
            console.log(data.data)
            const mergedData = mergeByDate(data.data);
            const formattedData = Object.values(mergedData).map(item => {
                const { date, ...loans } = item;
                return { date, ...loans };
            });
            console.log(formattedData, 'this is the end');
            setData(formattedData);
        })


    },[ListLoanId])
    return (
        <div className="h-full w-full  border-none">
        <Card className="border-none">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row ">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Line Chart - Interactive</CardTitle>
                    <CardDescription>
                        Showing total visitors for the last 3 months
                    </CardDescription>
                </div>
                
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={getData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        />
                        {Array.from(loanNames).map((item, index) => {
                            console.log(item); // Debugging: Log each item

                            return (
                                <Line
                                    key={`line-${index}`} // Unique key for React list rendering
                                    dataKey={item}
                                    type="monotone"
                                    stroke="red"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            );
                        })}
                        
                        
                        
                        
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
            </div>
    )
}
export default TimeLineLoan