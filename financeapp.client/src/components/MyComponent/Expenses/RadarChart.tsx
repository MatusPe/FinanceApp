"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
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
import React, {useState} from "react"


const chartConfig = {

} satisfies ChartConfig


function getData() {
    return [

        { Category: "Tesla", Name: "Model Y", Sender: "Tesla s.r.o", Price: 64950, Date: "2.12.2022" },
        { Category: "Ford", Name: "F-Series", Sender: "Ford Motor Company", Price: 33850, Date: "15.5.2023" },
        { Category: "Toyota", Name: "Corolla", Sender: "Toyota Motor Corporation", Price: 29600, Date: "10.12.2024" },
        { Category: "Toyota", Name: "Corolla", Sender: "Toyota Motor Corporation", Price: 29600, Date: "10.01.2025" },
        { Category: "Chevrolet", Name: "Bolt EV", Sender: "Chevrolet", Price: 35990, Date: "21.3.2021" },
        { Category: "BMW", Name: "iX3", Sender: "BMW Group", Price: 71000, Date: "8.10.2023" },
        { Category: "Nissan", Name: "Leaf", Sender: "Nissan Motor Co.", Price: 31990, Date: "5.6.2022" },
        { Category: "Audi", Name: "e-tron", Sender: "Audi AG", Price: 86500, Date: "11.1.2023" },
        { Category: "Mercedes-Benz", Name: "EQB", Sender: "Mercedes-Benz AG", Price: 56000, Date: "3.9.2022" },
        { Category: "Volkswagen", Name: "ID.4", Sender: "Volkswagen AG", Price: 41990, Date: "7.8.2021" },
        { Category: "Ford", Name: "Mustang Mach-E", Sender: "Ford Motor Company", Price: 42990, Date: "12.5.2022" },
        { Category: "Hyundai", Name: "Ioniq 5", Sender: "Hyundai Motor Company", Price: 46000, Date: "19.2.2024" },
        { Category: "Mercedes-Benz", Name: "EQB", Sender: "Mercedes-Benz AG", Price: 56000, Date: "3.9.2022" },
        { Category: "Volkswagen", Name: "ID.4", Sender: "Volkswagen AG", Price: 41990, Date: "7.8.2021" },
        { Category: "Ford", Name: "Mustang Mach-E", Sender: "Ford Motor Company", Price: 42990, Date: "12.5.2022" },
        { Category: "Hyundai", Name: "Ioniq 5", Sender: "Hyundai Motor Company", Price: 46000, Date: "19.2.2024" },
        { Category: "Mercedes-Benz", Name: "EQB", Sender: "Mercedes-Benz AG", Price: 56000, Date: "3.9.2022" },
        { Category: "Volkswagen", Name: "ID.4", Sender: "Volkswagen AG", Price: 41990, Date: "7.8.2021" },
        { Category: "Ford", Name: "Mustang Mach-E", Sender: "Ford Motor Company", Price: 42990, Date: "12.5.2022" },
        { Category: "Hyundai", Name: "Mustang Mach-E", Sender: "Ford Motor Company", Price: 42990, Date: "12.12.2024" },
        { Category: "newhunda", Name: "Mustang Mach-E", Sender: "Ford Motor Company", Price: 42990, Date: "12.12.2024" },
        { Category: "newhunda", Name: "Mustang Mach-E", Sender: "Ford Motor Company", Price: 50990, Date: "01.1.2025" },
        { Category: "newhunda", Name: "Mustang Mach-E", Sender: "Ford Motor Company", Price: 42990, Date: "01.1.2024" },
        { Category: "BMW", Name: "iX3", Sender: "BMW Group", Price: 71000, Date: "15.11.2024" },
        { Category: "Mercedes-Benz", Name: "EQB", Sender: "Mercedes-Benz AG", Price: 56000, Date: "25.10.2024" },
        { Category: "Volkswagen", Name: "ID.4", Sender: "Volkswagen AG", Price: 41990, Date: "13.11.2024" },
        { Category: "Hyundai", Name: "Ioniq 5", Sender: "Hyundai Motor Company", Price: 46000, Date: "1.10.2024" },
        { Category: "Ford", Name: "Mustang Mach-E", Sender: "Ford Motor Company", Price: 42990, Date: "22.10.2024" },
        { Category: "Toyota", Name: "Land Cruiser", Sender: "Toyota Motor Corporation", Price: 60000, Date: "5.11.2024" },
        { Category: "Hyundai", Name: "Palisade", Sender: "Hyundai Motor Company", Price: 60000, Date: "20.11.2024" }


    ];
}



function TransformaDate(data, target) {

    const targetmouth = target.getMonth()
    const targetYear = target.getFullYear()

    return  data.reduce((acc, item) => {

        const itemDate = new Date(item.Date.split('.').reverse().join('-'));
        const currentDate=new Date();
        const IdItem=(itemDate.getMonth()==currentDate.getMonth()&&itemDate.getFullYear()==currentDate.getFullYear())?'CurrentMonth':'other';
        const category = item.Category;

        if (
            (itemDate.getMonth() !== targetmouth || itemDate.getFullYear() !== targetYear) &&
            (itemDate.getMonth() !== currentDate.getMonth() || itemDate.getFullYear() !== currentDate.getFullYear())
        ) {
            console.log(itemDate.getMonth());
            return acc;
        }




        if (!acc[category]) {
            acc[category] = {};
            acc[category]['CurrentMonth'] = 0
            acc[category]['other'] = 0

        }

        acc[category][IdItem] += item.Price;

        return acc;
    }, {});

}


function RadarComponent() {

    const [selectedDate, setSelectedDate] = useState(() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date;
    });

    function HandleSelect(number) {
        const currentDate = new Date();

        if((selectedDate.getMonth() >= currentDate.getMonth()&&selectedDate.getFullYear() == currentDate.getFullYear()&&number!=-1) || selectedDate.getFullYear() > currentDate.getFullYear()) { return}
        setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + number)));

    }

    const transform=TransformaDate(getData(), selectedDate)

    const chartDataone = Object.entries(transform).map(([category, values]) => ({
        category,
        CurrentMonth: values.CurrentMonth,
        other: values.other
    }));

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
                    <RadarChart data={chartDataone} className=" w-full h-full p-0 m-0  ">
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line"/>}
                        />
                        <PolarAngleAxis dataKey="category" className="w-full h-full  m-0 p-0"/>
                        <PolarGrid/>
                        <Radar
                            dataKey="other"
                            fill="red"
                            fillOpacity={0.6}
                        />
                        <Radar dataKey="CurrentMonth" fill="blue" fillOpacity={0.6}/>
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




