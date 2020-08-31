import React, {useEffect, useState} from 'react';
import {toast, ToastContainer} from 'react-toastify'
import axios from 'axios';

import authSvg from '../assets/auth.svg'

const ResetPassword = ({match, history}) => {

    const [formData, setFormData] = useState({
        password1 : '',
        password2 : '',
        token: '',
        textChange : 'Submit'
    })

    useEffect(() => {
        let token = match.params.token;
        if(token) {
            setFormData({...formData, token})
        }
    }, [])

    const { password2, password1, textChange, token } = formData;

    const handleChange = text => e => {
        setFormData({...formData, [text] : e.target.value})
    };

    const handleSubmit = e => {
        e.preventDefault()
        if(password1 === password2 && password1 && password2) {
            setFormData({...formData, textChange: "Submitting"})

            axios
                .put('http://localhost:5000/auth/resetpassword', {
                    newPassword: password1,
                    resetPasswordLink: token
                })
                .then(res => {
                    console.log(res.data.message)
                    setFormData({
                        ...formData,
                        password1: '',
                        password2: '',
                        textChange: 'completed change'
                    })
                    toast.success(res.data.message)
                    window.setTimeout(() => {
                        history.push('/login')
                    }, 5500)
                })
                .catch(err => {
                    toast.error("Something is wrong try again")
                })
        }
        else {
            toast.error('password dose not matches')
        }

        console.log(token, password1)
    };



    return (
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
            <ToastContainer/>
            <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Reset your Password
                        </h1>
                        <div className="w-full flex-1 mt-8 text-indigo-500">
                            <form
                                className="mx-auto max-w-xs relative"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                    type='password'
                                    placeholder="Password"
                                    onChange={handleChange('password1')}
                                    value={password1}
                                />
                                <input
                                    className='w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                    type='password'
                                    placeholder="Confirm Password"
                                    onChange={handleChange('password2')}
                                    value={password2}
                                />
                                <button
                                    type='submit'
                                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                >
                                    <i className="fas fa-sign-in-alt w-6 -ml-2"/>
                                    <span className="ml-3">{textChange}</span>
                                </button>
                            </form>
                        </div>
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

export default ResetPassword;
