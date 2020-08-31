import React, {useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {Link} from 'react-router-dom';

import authSvg from '../assets/update.svg'

const Private = () => {

    const [formData, setFormDate] = useState({
        name: '',
        email: '',
        password1: '',
        textChange: 'Update',
        role: ''
    });

    const { name, email, password1, textChange, role } = formData;

    useEffect(() => {
        loadProfile();
    }, [])

    const handleChange = text => e => {
        setFormDate({...formData, [text]: e.target.value})
    };

    const loadProfile = () => {

    }

    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
            <ToastContainer />
            <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            Profile Update
                        </h1>
                        <form
                            className="w-full flex-1 mt-8 text-indigo-500"
                            onSubmit={handleSubmit}
                        >
                            <div className="mx-auto max-w-xs relative">
                                <input
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                    disabled
                                    type='text'
                                    placeholder="Role"
                                    value={role}
                                />
                                <input
                                    className='w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                    disabled
                                    type='email'
                                    placeholder="Email"
                                    value={email}
                                />
                                <input
                                    className='w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                    disabled
                                    type='name'
                                    placeholder="Name"
                                    value={name}
                                />
                                <input
                                    className='w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                    disabled
                                    type='password'
                                    placeholder="Password"
                                    value={password1}
                                />

                                <button
                                    type="submit"
                                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                >
                                    <i className='fas fa-user-plus fa 1x w-6 -ml-2'/>
                                    <span className="ml-3">{textChange}</span>
                                </button>
                            </div>
                            <div className='my-12 border-b text-center'>
                                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                    Go To Home
                                </div>
                            </div>
                            <div className='flex flex-col items-center'>
                                <Link
                                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                                    to='/'
                                >
                                    <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                                    <span className='ml-4'>Home</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{backgroundImage: `url(${authSvg})`}}
                    >
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Private;
