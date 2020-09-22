import React, {useState, useEffect } from 'react';
import {toast, ToastContainer} from 'react-toastify';
import activationSvg from '../assets/welcome.svg'
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';
import jwt from 'jsonwebtoken'
import { withRouter } from 'react-router-dom';
import {registerUser} from '../actions/authActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

const Activation = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        token: '',
        show: true
    });

    useEffect(() => {
        let token = props.match.params.token;
        let { name } = jwt.decode(token);

        if (token) {
            setFormData({ ...formData, name, token });
        }

        console.log(token, name);
    }, [props.match.params]);
    const { name, token, show } = formData;

    const handleSubmit = e => {
        e.preventDefault();
        props.registerUser({token}, props.history)
        // axios
        //     .post(`http://localhost:5000/auth/activation`, {
        //         token
        //     })
        //     .then(res => {
        //         setFormData({
        //             ...formData,
        //             show: false
        //         });
        //         toast.success(res.data.message);
        //     })
        //     .catch(err => {
        //         toast.error(err.response.data.errors);
        //     });
    };


    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <ToastContainer/>
            <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            Welcome this {name}
                        </h1>
                    </div>

                    <form
                        className='w-full flex-1 mt-8 text-indigo-500'
                        onSubmit={handleSubmit}
                    >
                        <div className='mx-auto max-w-xs relative'>
                            <button
                                type='submit'
                                className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                            >
                                <i className='fas fa-user-plus fa 1x w-6 -ml-2'/>
                                <span className="ml-3">Activate your account</span>
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
                            <Link
                                className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                                to='/login'
                            >
                                <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2' />
                                <span className="ml-3">Sign In</span>
                            </Link>
                        </div>
                    </form>
                </div>
                <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{backgroundImage: `url(${activationSvg})`}}
                    >
                    </div>
                </div>
            </div>
        </div>
    );
};

// Activation.propTypes = {
//     registerUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired
// }
//

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {registerUser})(withRouter(Activation))
