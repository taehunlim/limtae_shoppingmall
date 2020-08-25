import React, {useState} from 'react';
import {ToastContainer, toast} from 'react-toastify'
import forgotSvg from "../assets/forget.svg";
import axios from 'axios'

const ForgotPassword = ({history}) => {
    const [formData, setFormData] = useState({
        email : '',
        textChange : 'Submit',
    });

    const {email, textChange} = formData;

    const handleChange = text => e => {
        setFormData({...formData, [text]:e.target.value})
    };

    const handleSubmit = e => {
        e.preventDefault();

        if( email ) {
            setFormData({...formData, textChange: 'submitting'})

            axios
                .put('http://localhost:5000/auth/forgotpassword', {
                    email
                })
                .then(res => {
                    setFormData({
                        ...formData,
                        email : '',
                        textChange: 'Submit'
                    })
                    toast.success(res.data.message, () => {
                        history.push('/login')
                    })
                    // setTimeout(() => {
                    //
                    // }, 10000)

                })
                .catch(err => {
                    setFormData({
                        ...formData,
                        name: '',
                        email: '',
                        password1: '',
                        password2: '',
                        textChange: 'Submit'
                    });
                    console.log(err)
                })
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <ToastContainer/>
            <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            Forgot Password
                        </h1>
                        <form
                            className='w-full flex-1 mt-8 text-indigo-500'
                            onSubmit={handleSubmit}
                        >
                            <div className='mx-auto max-w-xs relative'>
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type='email'
                                    placeholder="Email"
                                    onChange={handleChange('email')}
                                    value={email}
                                />
                                <button
                                    type='submit'
                                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                >
                                    <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2' />
                                    <span className="ml-3">{textChange}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{backgroundImage: `url(${forgotSvg})`}}
                    >

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
