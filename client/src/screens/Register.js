import React from 'react';
import axios from 'axios';
import {ToastContainer} from 'react-toastify'
import { Link, Redirect } from 'react-router-dom';

const Register = () => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <ToastContainer/>
            <div>
                <div>
                    <div>
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            Sign up for here
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
