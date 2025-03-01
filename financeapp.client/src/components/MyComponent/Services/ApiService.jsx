import {handleError} from "@/Helpers/handleError.jsx";
import axios from 'axios';
const api="https://localhost:44301/api/";

export const LoginAPI=async (username, password)=>{
    try{

        console.log(username);
        const data= await axios.post
        (api+"account/login",{username, password}


        )


        return data

    }catch(err){
        console.error('Request failed:', err);
        handleError(err)
    }


}


export const UpdateExpensesApi = async (type,expenses) => {
    
    console.log(expenses, 'this is update');

    try {
        const response = await axios.put(
            `${api}${type}/updateExpense`,  // Correct API endpoint
            expenses,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        );

        console.log("Success:", response.data);
        return response.data;  // ✅ Return the actual response data
    } catch (error) {
        if (error.response) {
            console.error("Server Response Error:", error.response.data);
        } else if (error.request) {
            console.error("No Response from Server:", error.request);
        } else {
            console.error("Request Error:", error.message);
        }

        return null; // Return null or handle errors properly
    }
};

export const UpdateonlyExpensesApi = async (expense) => {
    try {
        const data = await axios.put(
            api + "Expenses/UpdateonlyExpense",
            expense, // <-- Use expense directly
            {
                headers: { "Content-Type": "application/json" }
            }
        );
        return data;
    } catch (err) {
        console.error('Request failed:', err);
        handleError(err);
    }
};

export const GetExpensesByMouthApi = async (month, year) => {
    
    const monthNumber = parseInt(month, 10);
    try {
        const data = await axios.get(
            api + `Expenses/GetExpensesByMonth/${monthNumber}/${year}`,
            
            {
                
                headers: { "Content-Type": "application/json" }
            }
        );
        return data.data;
    } catch (err) {
        console.error('Request failed:', err);
        handleError(err);
    }
};


export const GetGroupedExpensesByMonthApi = async (year) => {

    const monthNumber = parseInt(year, 10);
    console.log(year,'this is getGroupedExpensesByMonth');
    try {
        const data = await axios.get(
            api + `Expenses/GetGroupedExpensesByMonth/${monthNumber}`,

            {

                headers: { "Content-Type": "application/json" }
            }
        );
        return data.data;
    } catch (err) {
        console.error('Request failed:', err);
        handleError(err);
    }
};




export const DeleteExpensesApi = async (expense) => {
    try {
        const data = await axios.delete(
            api + "Expenses/deleteExpense/"+expense.id,
             // <-- Use expense directly
            {
                headers: { "Content-Type": "application/json" }
            }
        );
        return data;
    } catch (err) {
        console.error('Request failed:', err);
        handleError(err);
    }
};

export const GetExpensesbyIdApi = async (id) => {
    try {
        const data = await axios.get(
            api + "Expenses/"+id,
            // <-- Use expense directly
            {
                headers: { "Content-Type": "application/json" }
            }
        );
        
        
        console.log(data,'sfsdfsdfdsfsdfsdfssssss');
        return data;
    } catch (err) {
        console.error('Request failed:', err);
        handleError(err);
    }
};