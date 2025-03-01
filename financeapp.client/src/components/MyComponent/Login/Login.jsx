import {Button} from "@/components/ui/button.tsx";
import {GoogleIcon} from "@/assets/IconReact.jsx";
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {LoginAPI} from "@/components/MyComponent/Services/AuthServices.jsx";
import {handleError} from "@/Helpers/handleError.jsx";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React from "react";

const validation = Yup.object().shape({
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});


export const Login=({setshowComponent})=>{
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validation), // Pass the Yup schema to the resolver
    });

    const handleLogin = async (form) => {
        try {
            LoginAPI(form.username, form.password).then(data=>{
                if (res) {
                    console.log('Redirecting to Expenses');
                    navigate("/Expenses");
                }
                
            });
            
        } catch (err) {
            console.error('Login failed:', err); // Catch and handle errors
            handleError(err); // Make sure handleError is defined
        }
    };
    
        return (<div className="rounded-lg p-6 bg-[#3A3535] text-white border-[1px] border-green-500 shadow-inner shadow-green-500">
            <h2 className="text-center text-4xl font-extrabold mb-6 border-b-black pb-3 shadow-[0_5px_2px_-2px_rgba(0,0,0,0.6)] [text-shadow:_0_2px_2px_rgb(0_0_0_/_0.8)]"
            >Login</h2>
            <div className={'w-full h-[30px] '}>
                <Button className={'w-[120px] h-[30px] hover:text-black bg-[#1f1f1f] rounded-[9px] text-green-500'}><div className={'z-50'}><GoogleIcon  size='16px' color={'#22c55e'}></GoogleIcon></div>Google
                </Button>

            </div>
            <div className={'border-b mt-3 border-gray-500 relative'}>

                <h1 className={'absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 px-2 text-gray-500 bg-[#3A3535]'}>OR CONTINUE WITH</h1>
            </div>


            <form  onSubmit={handleSubmit(handleLogin)}>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 bg-[#3A3535] border-b-[1px] border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 transition-all duration-300 text-white placeholder-green-500"
                        {...register("userName")}
                    />
                </div>
                {errors.userName ? (
                    <p className="text-white">{errors.userName.message}</p>
                ) : (
                    ""
                )}


                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 bg-[#3A3535] border-b-[1px] border-green-500 focus:outline-none  focus:border-green-600 transition-all duration-300 text-white placeholder-green-500"
                        {...register("password")}
                    />
                </div>
                {errors.password ? (
                    <p className="text-white">{errors.password.message}</p>
                ) : (
                    ""
                )}


                <div className="flex items-center justify-between text-sm text-green-500 mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox text-green-500 mr-2"
                        />
                        Remember me
                    </label>
                    <a href="#" className="hover:underline">
                        Forgot password?
                    </a>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                    Login
                </button>

            </form>

            {/* Footer Links */}
            <p className="text-center text-sm text-white mt-6">
                Don’t have an account?{" "}
                <a onClick={()=>setshowComponent()} className="text-green-500 hover:underline">
                    Register
                </a>
            </p>
        </div>
)
}