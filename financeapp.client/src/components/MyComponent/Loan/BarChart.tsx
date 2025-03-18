"use client"

import { TrendingUp } from "lucide-react"
import {Bar, BarChart, CartesianGrid, Label, LabelList, XAxis, YAxis} from "recharts"
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
import React, {useEffect} from "react"
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



function BarChartComponent({getData}: {getData: ChartConfig}, setData: ChartConfig) {

    const transformLoanData = (loanData) => {
        return loanData.map(loan => ({
            month: loan.loanName,  // Assuming "loanName" refers to the month or lender
            TotalBorrowed: loan.amounth,  // Assuming "amounth" represents total borrowed amount
            TotalRemining: loan.totalSpent,  // You can adjust this if there is a remaining amount
            Mounthly: loan.monthlyPayment,  // Assuming "monthlyPayment" represents monthly payment
            IR: loan.ir,  // Interest rate (IR)
            Duration: loan.term,  // Loan term in months
        })).sort((a, b) => b.TotalBorrowed - a.TotalBorrowed).slice(0, 5);;
    }
    
    
    return (
        <Card className="flex flex-col w-full h-full  border-none">
            <CardHeader className="flex-row justify-between   p-3">
                <CardTitle className={'text-white '}>Comparison of active loans</CardTitle>

            </CardHeader>
            <CardContent className=" h-[90%] w-full flex-grow   ">
                <ChartContainer config={chartConfig} className=" m-0 p-4  w-full  h-[95%] flex-grow">
                    <BarChart barGap={15} accessibilityLayer data={transformLoanData(getData)} className="  p-0 m-0 h-full w-full overflow-visible" >
                        <CartesianGrid vertical={false} className={'overflow-visible h-full w-full'}/>
                        <XAxis
                            dataKey="month"
                            
                            tickMargin={5}
                            
                            
                            
                        > </XAxis>
                        <YAxis yAxisId="borrowed" tick={false} axisLine={false} hide={true}  domain={[0, (dataMax) => (dataMax === 0 ? 1 : dataMax * 1.1)]} />
                        <YAxis yAxisId="remain" tick={false} axisLine={false} hide={true} domain={[0, (dataMax) => (dataMax === 0 ? 1 : dataMax * 1.1)]}/>
                        <YAxis yAxisId="mounthly" tick={false} axisLine={false} hide={true} domain={[0, (dataMax) => (dataMax === 0 ? 1 : dataMax * 1.1)]}/>
                        <YAxis yAxisId="IR" tick={false} axisLine={false} hide={true} domain={[0, (dataMax) => (dataMax === 0 ? 1 : dataMax * 1.1)]}/>
                        <YAxis yAxisId="Duration" tick={false} axisLine={false} hide={true} domain={[0, (dataMax) => (dataMax === 0 ? 1 : dataMax * 1.1)]}/>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <defs>
                            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#76FF03" />  
                                <stop offset="100%" stopColor="#00C853" />
                            </linearGradient>
                            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#00FFFF" />  
                                <stop offset="100%" stopColor="#0091EA" />
                            </linearGradient>
                            <linearGradient id="neonRedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#FF1744" />  
                                <stop offset="100%" stopColor="#D50032" /> 
                            </linearGradient>
                            <linearGradient id="neonPurpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#9C1AFF" />  
                                <stop offset="100%" stopColor="#6A00FF" />
                            </linearGradient>
                            <linearGradient id="darkBlueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="20%" stopColor="#00B0FF" />
                                <stop offset="100%" stopColor="#003C8F" />
                                
                                
                                
                            </linearGradient>
                        </defs>
                        <Bar dataKey="TotalBorrowed" fill="url(#greenGradient)" radius={[10, 10, 0, 0]} barSize={25} yAxisId="borrowed">
                            <LabelList content={(props) => (
                                <text
                                    x={props.x + props.width / 2}  // Adjust x to the center of the bar
                                    y={props.y - 5}  // Adjust y to place it slightly above the bar
                                    fill="#FFFFFF"
                                    textAnchor="middle"
                                >
                                    {props.value} $
                                </text>
                            )} position="top" fill="#FFFFFF"></LabelList>
                        </Bar>
                        <Bar dataKey="TotalRemining" fill="url(#blueGradient)" radius={[10, 10, 0, 0]} barSize={25} yAxisId="remain">
                            <LabelList content={(props) => (
                                <text
                                    x={props.x + props.width / 2}  // Adjust x to the center of the bar
                                    y={props.y - 5}  // Adjust y to place it slightly above the bar
                                    fill="#FFFFFF"
                                    textAnchor="middle"
                                >
                                    {props.value} $
                                </text>
                            )} position="top" fill="#FFFFFF"></LabelList>
                        </Bar>
                        <Bar dataKey="Mounthly" fill="url(#blueGradient)" radius={[10, 10, 0, 0]} barSize={25} yAxisId="mounthly">
                            <LabelList content={(props) => (
                                <text
                                    x={props.x + props.width / 2}  // Adjust x to the center of the bar
                                    y={props.y - 5}  // Adjust y to place it slightly above the bar
                                    fill="#FFFFFF"
                                    textAnchor="middle"
                                >
                                    {props.value} $
                                </text>
                            )} position="top" fill="#FFFFFF"></LabelList>
                        </Bar>
                        <Bar dataKey="IR" fill="url(#darkBlueGradient)" radius={[10, 10, 0, 0]} barSize={25} yAxisId="IR">
                            <LabelList content={(props) => (
                                <text
                                    x={props.x + props.width / 2}  // Adjust x to the center of the bar
                                    y={props.y - 5}  // Adjust y to place it slightly above the bar
                                    fill="#FFFFFF"
                                    textAnchor="middle"
                                >
                                    {props.value} %
                                </text>
                            )} position="top" fill="#FFFFFF"></LabelList>
                        </Bar>
                        <Bar dataKey="Duration" fill="url(#neonPurpleGradient)" radius={[10, 10, 0, 0]} barSize={25} yAxisId="Duration">
                            <LabelList content={(props) => (
                                <text
                                    x={props.x + props.width / 2}  // Adjust x to the center of the bar
                                    y={props.y - 5}  // Adjust y to place it slightly above the bar
                                    fill="#FFFFFF"
                                    textAnchor="middle"
                                >
                                    {props.value} Y
                                </text>
                            )} position="top" fill="#FFFFFF"></LabelList>
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}
export default BarChartComponent