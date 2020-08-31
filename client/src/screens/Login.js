import React, {useState} from 'react';
import { isAuth, authenticate, setCookie } from '../helpers/auth'
import {ToastContainer, toast} from "react-toastify";
import {Link} from 'react-router-dom'
import axios from 'axios'
import { GoogleLogin } from 'react-google-login';
import FaceBookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import loginSvg from '../assets/login.svg'

const Login = ({history}) => {

    const [formData, setFromData] = useState({
        email : '',
        password : '',
        forgotPassword: '',
        textChange : 'Login'
    });

    const {email, password, forgotPassword, textChange} = formData;

    const handleChange = text => e => {
        setFromData({...formData, [text]: e.target.value})
    };

    const responseGoogle = response => {
        setGoogleToken(response.tokenId)
    }

    const setGoogleToken = tokenId => {
        axios
            .post('http://localhost:5000/auth/googlelogin', {
                idToken : tokenId
            })
            .then(res => {
                console.log("google info =================", res)
                informParent(res)
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    const sendFacebookToken = (userId, accessToken) => {
        axios
            .post(`http://localhost:5000/auth/facebooklogin`, {
                userId,
                accessToken
            })
            .then(res => {
                console.log(res.data);
                informParent(res);
            })
            .catch(error => {
                console.log('FACEBOOK SIGNIN ERROR', error.response);
            });
    };
    //
    // const sendFacebookToken = (userId, accessToken)  => {
    //     axios
    //         .post('http://localhost:5000/auth/facebooklogin', {
    //             userId, accessToken
    //         })
    //         .then(res => {
    //             console.log('facebook ========> ', res.data)
    //         })
    //         .catch(err => {
    //             console.log('Facebook Sign Error', err.response)
    //         })
    // }

    const informParent = response => {
        authenticate(response, () => {
            isAuth() && isAuth().role === 'admin'
                ? history.push('/admin')
                : history.push('/private');
        });
    };


    const responseFacebook = response => {
        console.log("sdasdasdasd===================", response)
        sendFacebookToken(response.userId, response.accessToken)
    }

    const handleSubmit = e => {
        e.preventDefault();
        if( email && password ) {
            setFromData({...formData, textChange: 'submitting'})
            axios
                .post('http://localhost:5000/auth/login', {
                    email,
                    password
                })
                .then(res => {
                    authenticate(res, () => {
                        setFromData({
                            ...formData,
                            email: '',
                            password: '',
                            textChange: "submitted"
                        })
                        // setCookie('token', res.data.token)
                        console.log('res data ----------', res)
                        isAuth() && isAuth().role === 'admin'
                            ? history.push('/admin')
                            : history.push('/private')
                        toast.success(`Hey ${res.data.user.name}, welcome back`)
                    })
                })
                .catch(err => {
                    setFromData({
                        ...formData,
                        email: '',
                        password: '',
                        textChange: 'Login'
                    });
                    console.log(err)
                    toast.error(err.response.data.errors)
                })
        }
        else {
            toast.error('Please fill all fields')
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <ToastContainer/>
            <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            Sign in for here
                        </h1>

                        <div className="w-full flex-1 mt-8 text-indigo-500">
                            <div className='flex flex-col items-center'>
                                <GoogleLogin
                                    clientId='708727454454-ktgjf8o9d5g9acu51lrncihcti9pkasg.apps.googleusercontent.com'
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    render={renderProps => (
                                        <button
                                            className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                        >
                                            <div className="p-2 rounded-full">
                                                <i className='fab fa-google'/>
                                            </div>
                                            <span className='ml-4'> Sign In with Google</span>
                                        </button>
                                    )}
                                />

                                <FaceBookLogin
                                    appId={`368104864585822`}
                                    autoLoad={false}
                                    callback={responseFacebook}

                                    render={renderProps => (
                                        <button
                                            onClick={renderProps.onClick}
                                            className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                                        >
                                            <div className="p-2 rounded-full">
                                                <i className='fab fa-facebook'/>
                                            </div>
                                            <span className='ml-4'> Sign In with Facebook</span>
                                        </button>
                                    )}
                                />

                                <Link
                                    className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                                    to='/register'
                                >
                                    <i className='fas fa-user-plus fa 1x w-6  -ml-2 text-indigo-500' />
                                    <span className='ml-4'>Sign Up</span>
                                </Link>

                            </div>
                        </div>


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
                                    onChange={handleChange('email')}
                                    value={email}
                                />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type='password'
                                    placeholder='password'
                                    onChange={handleChange('password')}
                                    value={password}
                                />
                                <button
                                    type='submit'
                                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                >
                                    <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2' />
                                    <span className="ml-3">{textChange}</span>
                                </button>
                                <div>
                                    <Link
                                        to='/forgotpassword'
                                    >
                                        <i/>
                                        <span className='ml-4'>forgot password</span>
                                    </Link>
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
