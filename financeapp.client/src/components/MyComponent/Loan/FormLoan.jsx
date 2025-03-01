import {useMemo, useState} from "react";

import CalendarForm from "./CalendarComponent.tsx";

const FormLoan = () => {
    const currentDate = new Date().toLocaleDateString();

    const [dob, setDob] = useState(null);



    return (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[500px] h-[500px] bg-[#3A3535] rounded-[9px] shadow-md border-green-500 border '>
            <h2 className='my-7 text-[17px] font-bold '>Add Transaction</h2>
            <form className='flex flex-col justify-center items-center'>
                <div className='w-[400px] mb-5'>
                    <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
                        <div className="flex flex-col relative w-[200px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Type</label>
                            <input type="Type" placeholder="Type of transaction"
                                   className="w-full rounded-[9px] border-green-500 border p-2"/>
                        </div>
                        <div className="flex flex-col relative w-[200px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Name</label>
                            <input type="text" placeholder="Name of the transaction"
                                   className="w-full rounded-[9px] border-green-500 border p-2"/>
                        </div>
                    </div>
                    <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
                        <div className="flex flex-col relative w-[200px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Sender</label>
                            <input type="text" placeholder="Name of the Sender"
                                   className="w-full rounded-[9px] border-green-500 border p-2"/>
                        </div>
                        <div className="flex flex-col relative w-[200px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Receiver</label>
                            <input type="text" placeholder="Name of Receiver"
                                   className="w-full rounded-[9px] border-green-500 border p-2"/>
                        </div>
                    </div>
                    <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
                        <div className="flex flex-col relative w-[340px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Category</label>
                            <input type="text" placeholder="Name of Category"
                                   className="w-full rounded-[9px] border-green-500 border p-2"/>
                        </div>
                        <div className="flex flex-col relative w-[140px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Price</label>
                            <input type="text" placeholder="0"
                                   className="w-full rounded-[9px] border-green-500 border p-2"/>
                        </div>
                        <div className="flex flex-col relative w-[170px]">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Date</label>

                            <CalendarForm  className='bg-black' dob={dob} setDob={setDob}></CalendarForm>

                        </div>
                    </div>

                    <div className='flex flex-row gap-3 w-[400px] h-[30px] rounded-[9px] mb-5'>
                        <div className="flex flex-col relative w-full">
                            <label
                                className="absolute top-[-10px] left-5 text-green-500 bg-gradient-to-t from-[#3A3535] to-[#3A3535]  rounded-b-[9px]  border-b-green-500 border-b">Notes</label>
                            <input type="text" placeholder="Comment"
                                   className="w-full rounded-[9px] border-green-500 border p-2"/>
                        </div>

                    </div>

                </div>
                <div
                    className=' h-[100px] w-[400px] border-2 border-dashed border-green-500 items-center justify-center'>
                    <label htmlFor="file-upload">
                        <span>Upload Additional File</span>
                        <input id="file-upload" type="file"/>
                    </label>

                </div>
                <p className='mb-2 text-[12px]'>Attach file. File size of your documents should not exceed 10MB.</p>
                <div className='flex flex-row gap-3 w-[400px]'>
                    <button type="submit"
                        className='w-[80px] h-[40px] bg-[#3A3535] hover:scale-110 transition-transform duration-300 onClick="window.location.reload()"'>Cancel
                    </button>
                    <button type="submit"
                        className='w-[400px] h-[40px] bg-green-500 hover:scale-110 transition-transform duration-300'>Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormLoan;
