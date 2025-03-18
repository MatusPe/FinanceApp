import * as React from "react";
import { TrendingUp } from "lucide-react";

import '@/app/globals.css'

import {Label, LabelList, Legend, Pie, PieChart} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer, ChartLegend, ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { SelectItem } from "@radix-ui/react-select";
import {Select, SelectContent, SelectTrigger, SelectValue} from "@/components/ui/select";
import {meta} from "eslint-plugin-react/lib/rules/jsx-props-no-spread-multi";
import category = meta.docs.category;
import {useEffect} from "react";
import { GetExpensesByBudgetApi} from "../Services/ApiServiceBudget.jsx";

const chartData = [
    { category: "Tesla", price: 64950, fill: 'var(--teal400)', date: "2024-03-15" },
    { category: "Ford", price: 33850, fill: 'var(--teal500)', date: "2024-03-10" },
    { category: "Toyota", price: 29600, fill: 'var(--teal600)', date: "2024-03-05" },
    { category: "Chevrolet", price: 35990, fill: 'var(--teal700)', date: "2024-03-20" },
    { category: "BMW", price: 71000, fill: 'var(--emerald-400)', date: "2024-03-18" },
    { category: "Nissan", price: 31990, fill: 'var(--emerald-500)', date: "2024-03-25" },
    { category: "Audi", price: 86500, fill: 'var(--emerald-600)', date: "2024-03-12" },
    { category: "Mercedes-Benz", price: 56000, fill: 'var(--emerald-700)', date: "2024-03-30" },
    { category: "Volkswagen", price: 41990, fill: 'var(--green-400)', date: "2024-03-22" },
    { category: "Hyundai", price: 46000, fill: 'var(--green500)', date: "2024-03-15" },

    { category: "Porsche", price: 92000, fill: 'var(--green600)', date: "2024-03-01" },
    { category: "Lamborghini", price: 250000, fill: 'var(--green700)', date: "2024-03-05" },
    { category: "Ferrari", price: 350000, fill: "rgba(211, 47, 47, 1)", date: "2024-05-10" },
    { category: "Aston Martin", price: 180000, fill: "rgba(103, 58, 183, 1)", date: "2024-12-15" },
    { category: "Maserati", price: 95000, fill: "rgba(33, 150, 243, 1)", date: "2024-12-20" }
];

const chartConfig = {
    price: { label: "Price:" },
    Tesla: { label: "Tesla:", color: "rgba(0, 209, 255, 1)" },
    Ford: { label: "Ford:", color: "rgba(29, 29, 29, 1)" },
    Toyota: { label: "Toyota:", color: "rgba(163, 0, 214, 1)" },
    Chevrolet: { label: "Chevrolet:", color: "rgba(76, 175, 80, 1)" },
    BMW: { label: "BMW:", color: "rgba(255, 64, 129, 1)" },
    Nissan: { label: "Nissan:", color: "rgba(158, 158, 158, 1)" },
    Audi: { label: "Audi:", color: "rgba(0, 200, 83, 1)" },
    "Mercedes-Benz": { label: "Mercedes-Benz: \u00A0 ", color: "rgba(244, 67, 54, 1)" },
    Volkswagen: { label: "Volkswagen:", color: "rgba(96, 125, 139, 1)" },
    Hyundai: { label: "Hyundai:", color: "rgba(156, 39, 176, 1)" },
} satisfies ChartConfig;

function getDatabyDate(data, mouth, year) {
    console.log(data)
    console.log("ratatuj")
    const transformObject= Object.entries(data).filter(([key, value])=>new Date(value.date).getMonth() === (mouth));

    const values = transformObject.map(([key, value]) => value);
    console.log(values)
    return values




}

const month={
    Jan: "1",
    Feb: "2",
    Mar: "3",
    Apr: "4",
    May: "5",
    Jun: "6",
    Jul: "7",
    Aug: "8",
    Sep: "9",
    Oct: "10",
    Nov: "11",
    Dec: "12",
}

export function BudgetPieChartComponent({name, duration, getdata}) {


    
    const [getData, setData] = React.useState([]);
    
    const totalPrice = getData.reduce((acc, curr) => acc + curr.price, 0);

    useEffect(() => {
        if (name){
            console.log(duration,'to je duracia');
            GetExpensesByBudgetApi(name, duration).then((res)=>{
                console.log(res)
                setData(res.data)
                
            })
        }else if(getdata){
            
            var filterdata=getdata.filter(item => item.interval <= 30);

            filterdata.sort((a, b) => b.limitAmount - a.limitAmount);
            var mainCategories = filterdata.slice(0, 11);
            var otherCategories = filterdata.slice(11);

            var otherTotal = otherCategories.reduce((acc, item) => acc + item.limitAmount, 0);


            var data = mainCategories.map(item => ({
                category: item.category,
                price: item.limitAmount
            }));


            if (otherCategories.length > 0) {
                data.push({
                    category: "Other",
                    price: otherTotal
                });
            }
            
            setData(data)
            console.log(data,'getteddata')
        }
        
    }, [name, getdata]);
    return (
        <Card className="flex h-full w-full flex-col   border-none">
            <CardHeader className="items-center pb-0 flex-row">




            </CardHeader>
            <CardContent className=" h-[90%] w-full flex-grow   ">
                <ChartContainer
                    config={chartConfig}
                    className=" m-0 p-0  w-full  h-full flex-grow"
                >

                    <PieChart className="flex-col  m-0 p-0   ">
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel/>}
                        />

                        <Pie
                            data={getData}
                            dataKey="price"
                            nameKey="category"
                            innerRadius={"70%"}
                            outerRadius={"90%"}
                            strokeWidth={2}
                        >

                            <Label
                                content={({viewBox}) => {
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
                                                    className="fill-foreground text-2xl font-bold "
                                                >
                                                    ${totalPrice.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    style={{fill: 'white'}}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                            <LabelList
                                dataKey="price"
                                className="fill-background"
                                stroke="none"
                                fontSize={10}
                                fontWeight={'bold'}

                                style={{fill: 'white'}}
                                formatter={(value) => {

                                    const total = getData.reduce((sum, entry) => sum + entry.price, 0);

                                    const percentage = ((value / total) * 100).toFixed(2);
                                    return `${percentage}%`;
                                }}


                            />

                        </Pie>
                        <Legend
                            layout="vertical"
                            align="right"
                            verticalAlign="middle"
                            wrapperStyle={{paddingLeft: 20}}
                            iconType="circle"
                        />


                    </PieChart>


                </ChartContainer>


            </CardContent>

        </Card>
    );
}
