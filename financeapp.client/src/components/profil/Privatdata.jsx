import {UserRoundPen} from "lucide-react";
import {Switch} from "@/components/ui/switch";

import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo/index.js";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export const ProfileTable=(props)=>{


    return (<div className="h-full w-[60%] flex-col flex bg-gradient-to-r from-[#3A3535] to-[#1F1B1B]  rounded-[9px]  items-center max-w-[960px] ">
        <div className="h-[160px] w-[97%] flex flex-row  m-5 rounded-[9px] border bg-[#2C2A2A] border-green-500">

            <UserRoundPen size='140px' className='m-2  rounded-full bg-black '  color='#22c55e' />
            <div className='flex-col flex justify-center'><h1 className='text-[30px] text-white font-bold'>Matus penicka</h1><h1 className='text-gray-500'>matuspenicka007@gmail.com</h1></div>

        </div>

        <div className="h-full w-[97%] flex flex-col m-5 rounded-[9px] border bg-[#2C2A2A] border-green-500 flex-grow p-5">

            <div className='flex flex-row mt-10 justify-between'>
                <div className="flex flex-col relative w-[49%]">
                    <label
                        className="absolute top-[-20px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-[9px]  border-b-green-500 border-b">Firstname</label>
                    <input type="Type" placeholder="Firstname"  maxLength={15}
                           className="w-full  border-green-500 border-b p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  "/>
                </div>
                <div className="flex flex-col relative w-[49%]">
                    <label
                        className="absolute top-[-20px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-[9px]  border-b-green-500 border-b">Lastname</label>
                    <input type="Type" placeholder="Lastname"  maxLength={15}
                           className="w-full  border-green-500 border-b p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  "/>
                </div>
            </div>

            <div className="flex flex-col relative w-[100%] mt-[50px] ">
                <label
                    className="absolute top-[-20px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-[9px]  border-b-green-500 border-b">Username</label>
                <input type="Type" placeholder="Username"  maxLength={15}
                       className="w-full  border-green-500 border-b p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  "/>
            </div>


            <div className={'flex flex-row mt-[20px]'}>
                <div className="flex  flex-col items-center  w-[50%] justify-center items-center">
                    <h1 className='ml-2 text-white'>Sex</h1>
                    <div className='mt-1 flex-row flex justify-center items-center '>
                        <h1 className={'mr-4 text-white'}>M</h1>
                        <Switch color='#FF0000' id="airplane-mode"  />
                        <h1 className={'ml-4 text-white'}>F</h1>
                    </div>


                </div>
                <div className={'w-[50%] justify-center items-center flex'}>
                    <BasicDatePicker label="Basic date picker" sx={{ color: 'text.secondary' }} />
                </div>

            </div>

            <div className="flex flex-col relative w-[100%] mt-[40px] ">
                <label
                    className="absolute top-[-20px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-[9px]  border-b-green-500 border-b">Graduated</label>
                <input type="Type" placeholder="Graduated"  maxLength={15}
                       className="w-full  border-green-500 border-b p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  "/>
            </div>
            <div className="flex flex-col relative w-[100%] mt-[50px] ">
                <label
                    className="absolute top-[-20px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-[9px]  border-b-green-500 border-b">Job</label>
                <input type="Type" placeholder="Job"  maxLength={15}
                       className="w-full  border-green-500 border-b p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  "/>
            </div>


        </div>

    </div>





)
}

export function BasicDatePicker() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker label="Basic date picker"

                            slotProps={{
                                layout: {
                                    sx: {
                                        backgroundColor: "#3A3535",
                                        border: "1px solid #22c55e",
                                        borderRadius: "15px",
                                        color: "#22c55e",
                                        marginTop: "0.5%",
                                    },
                                },
                                textField: {
                                    sx: {
                                        color: 'green', // Green text color for the input
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'green', // Green border color for input
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'lightgreen', // Light green border on hover
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#22c55e', // Green border when focused
                                            },
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'green', // Green text inside the input
                                        },
                                        '& .MuiFormLabel-root': {
                                            color: 'green', // Green label color
                                        },
                                        '& .MuiFormLabel-root.Mui-focused': {
                                            color: '#22c55e', // Brighter green when focused
                                        },
                                        '& .MuiSvgIcon-root': {
                                            color: 'green', // Changes the calendar icon color
                                        },
                                    },
                                },
                                popper: {
                                    sx: {
                                        "& .MuiPaper-root": {
                                            backgroundColor: "#222222",  // Background of the calendar
                                            color: "lightgrey",          // Text color
                                            borderRadius: "15px",
                                        },
                                        "& .MuiPickersDay-root": {
                                            color: "lightgrey", // Dates color
                                        },
                                        "& .MuiPickersDay-root.Mui-selected": {
                                            backgroundColor: "#555555", // Selected date background
                                            color: "#ffffff", // Selected date text
                                        },

                                    }
                                },
                                day: ({ day, selected }) => ({
                                    style: {
                                        color: day.isAfter(dayjs()) ? 'gray' : 'white', // Set text color
                                        fontWeight: day.isAfter(dayjs()) ? 'normal' : 'bold',
                                        backgroundColor: selected ? 'green' : 'transparent',
                                    },
                                }),
                            }}       />
            </DemoContainer>
        </LocalizationProvider>
    );
}


