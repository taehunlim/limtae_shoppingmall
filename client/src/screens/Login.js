import React, {useState} from 'react';
import {ToastContainer} from "react-toastify";
import loginSvg from '../assets/login.svg'

const Login = () => {

    const [formData, setFromData] = useState({
        email : '',
        password : '',
        forgotPassword: '',
        textChange : 'Login'
    });

    const {email, password, forgotPassword, textChange} = formData

    const handleChange = text => e => {};

    const handleSubmit = e => {};


    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <ToastContainer/>
            <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            Sign in for here
                        </h1>

                        <form
                            className='w-full flex-1 mt-8 text-indigo-500'
                            onSubmit={handleSubmit}
                        >
                            <div className='mx-auto max-w-xs relative'>
                                <button
                                    type='submit'
                                    className='mt-5 tracking-wide font-semibold bg-gray-300 text-black w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                >
                                    <i className="fab fa-google 1x w-6 -ml-2"/>
                                    <span className="ml-3">Sign in with Google</span>
                                </button>
                                <button
                                    type='submit'
                                    className='mt-5 tracking-wide font-semibold bg-gray-300 text-black w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                >
                                    <i className="fab fa-facebook-square 1x w-6 -ml-2"/>
                                    <span className="ml-3">Sign in with Facebook</span>
                                </button>
                                <button
                                    type='submit'
                                    className='mt-5 tracking-wide font-semibold bg-gray-300 text-black w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                >
                                    <i className="fas fa-user-plus fa 1x w-6 -ml-2"/>
                                    <span className="ml-3">Sign up</span>
                                </button>
                            </div>
                        </form>

                        <div className='my-12 border-t text-center'>
                            <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                Or sign with email or social login
                            </div>
                        </div>

                        <form
                            className='w-full flex-1 mt-8 text-indigo-500'
                            onSubmit={handleSubmit}
                        >
                            <div className='mx-auto max-w-xs relative'>
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type='email'
                                    placeholder='email'
                                    onChange={handleChange(email)}
                                />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type='password'
                                    placeholder='password'
                                    onChange={handleChange(password)}
                                />
                                <button
                                    type='submit'
                                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                >
                                    <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2' />
                                    <span className="ml-3">{textChange}</span>
                                </button>
                                <div>
                                    <a
                                        className=""
                                        href='/forgotpassword'
                                        target='_self'
                                    >
                                        <i/>
                                        <span className='ml-4'>forgot password</span>
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{backgroundImage: `url(${loginSvg})`}}
                    >

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
