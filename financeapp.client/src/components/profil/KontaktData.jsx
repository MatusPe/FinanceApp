import {Switch} from "@/components/ui/switch";
import {BasicDatePicker} from "@/components/profil/Privatdata.jsx";
import {ComboboxDemo} from "@/components/ui/Combobox.tsx";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button.tsx";
import { RefreshCcw } from 'lucide-react';


export const ContactTable=(props)=> {

return (<div className="h-full w-[40%] flex-col flex gap-5 bg-gradient-to-r from-[#3A3535] to-[#1F1B1B]  rounded-[9px] p-5 ">

    <div className="h-[50%] w-full flex flex-col  rounded-[9px] border bg-[#2C2A2A] border-green-500 flex-grow p-5 gap-5">
        <div className='text-white text-[25px]'>Contact details</div>
        <div className='flex flex-row mt-10 justify-between gap-5'>
            <div className="flex flex-col relative w-[100%]">
                <label
                    className="absolute top-[-20px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-[9px]  border-b-green-500 border-b">Email</label>
                <input type="Type" placeholder="Email"  maxLength={15}
                       className="w-full  border-green-500 border-b p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  "/>
            </div>

        </div>

        <div className="flex flex-col relative w-[100%] mt-[30px] ">
            <label
                className="absolute top-[-20px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-[9px]  border-b-green-500 border-b">Phone Number</label>
            <input type="Type" placeholder="Phone Number"  maxLength={15}
                   className="w-full  border-green-500 border-b p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  "/>
        </div>


        <div className={'flex flex-row mt-[20px] gap-5'}>
            <div className="flex flex-col relative w-[50%]  ">
                <label
                    className="absolute top-[-20px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-[9px]  border-b-green-500 border-b">State</label>
                <input type="Type" placeholder="State"  maxLength={15}
                       className="w-full  border-green-500 border-b p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  "/>
            </div>



            <div className="flex flex-col relative w-[50%]  ">
                <label
                    className="absolute top-[-20px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-[9px]  border-b-green-500 border-b">City</label>
                <input type="Type" placeholder="City"  maxLength={15}
                       className="w-full  border-green-500 border-b p-2 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  "/>
            </div>

        </div>
    </div>
   <Optiontable></Optiontable>

</div>


)
}

const Optiontable=(props)=>{

    return(<div className="h-[50%] w-full flex  flex-col  rounded-[9px] border bg-[#2C2A2A] border-green-500 flex-grow p-5 ">
        <div className='text-white text-[25px]'>Quick option</div>




        <div className={'flex flex-row mt-[20px] justify-center  '}>
            <div className='mt-6 '><ComboboxDemo ></ComboboxDemo></div>
            <div className="flex  flex-col items-center  w-[50%] justify-center items-center ">
                <h1 className='ml-2 text-white'>Sex</h1>
                <div className='mt-1 flex-row flex justify-center items-center '>
                    <h1 className={'mr-4 text-white'}>M</h1>
                    <Switch color='#FF0000' id="airplane-mode"  />
                    <h1 className={'ml-4 text-white'}>F</h1>
                </div>


            </div>




        </div>
        <div className={'flex flex-row mt-5 justify-center items-center'}>
        <Checkbox /><h1 className={' ml-5 text-white text-[15px]'}>Approve notification</h1>
        </div>
        <div className={'h-[60px] pt-20 flex justify-end'}><Button className='w-[200px] rounded-[9px] text-[15px]'><RefreshCcw />Update Profile</Button></div>

    </div>)
}
