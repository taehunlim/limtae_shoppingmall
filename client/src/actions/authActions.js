import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {GET_ERRORS, SET_CURRENT_USER} from './types';
import setAuthToken from "../utils/setAuthToken";

const initialState = {
    isAuthenticated: false,
    user: {}
};

export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/auth/activation', userData)
        .then(res => (
            history.push('/login')
        ))
        .catch(err => (
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        ))
}

export const loginUser = userData => dispatch => {
    axios
        .post('/auth/login', userData)
        .then(res => {
            const {token} = res.data;

            localStorage.setItem('jwtToken', token)

            setAuthToken(token);

            const decoded = jwt_decode(token);

            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}))
}