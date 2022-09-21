import axios from "axios";
import { loginFailed, loginStart, loginSuccess, logOutFailed, logOutStart, logOutSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";
import { getUserFailed, getUserStart, getUserSuccess } from "./userSlice";


export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`http://localhost:8000/v1/auth/login`, user);
        dispatch(loginSuccess(res.data));
        navigate('/')
    } catch (error) {
        dispatch(loginFailed(error))
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart())
    try {
        await axios.post(`http://localhost:8000/v1/auth/register`, user);
        dispatch(registerSuccess());
        navigate("/login");
    } catch (error) {
        dispatch(registerFailed(error))
    }
}

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUserStart());
    try {
        const res = await axiosJWT.get('http://localhost:8000/v1/user', {
            headers: {token: `Bearer ${accessToken}`}
        });
        dispatch(getUserSuccess(res.data))
    } catch (error) {
        dispatch(getUserFailed(error))
    }
}

export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logOutStart())
    try {
        await axiosJWT.post('http://localhost:8000/v1/auth/logout',id, {
            headers: {token: `Bearer ${accessToken}`}
        })
        dispatch(logOutSuccess())
        navigate("/login")
    } catch (error) {
        dispatch(logOutFailed(error))
    }
}