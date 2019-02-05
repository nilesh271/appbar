import axios from 'axios'
import { setData, removeData } from "../utilities/localStorage";
import { LOGIN_STORAGE_KEY } from "../constants/keys";


export const ACTION_TYPE = {
    TOGGLE_LOGIN: "TOGGLE_LOGIN",
    LOGIN: "LOGIN",
    PRE_LOGIN: "PRE_LOGIN",
    POST_LOGIN: "POST_LOGIN",
    LOGOUT: "LOGOUT",
    PRE_LOGOUT: "PRE_LOGOUT",
    POST_LOGOUT: "POST_LOGOUT",
    REGISTER: "REGISTER",
    PRE_REGISTER: "PRE_REGISTER",
    POST_REGISTER: "POST_REGISTER",
}

export const toggleLogin = () => {
    return {
        type: ACTION_TYPE.TOGGLE_LOGIN,
        payload: {}
    }
}

export const login = ({ username, password, userProfile }) => {
    return function (dispatch, getState) {
        if(userProfile){
            dispatch(postLogin({
                isLoggedIn: true, 
                userProfile: userProfile, 
                isLoginDialogOpen: false
            }));
        }
        else{
            const { config } = getState();

            dispatch(preLogin());

            return axios.post(`${config.REST_BASE_URL}/auth/login`, {username, password})
            .then(({data}) => {
                setData(LOGIN_STORAGE_KEY, data)

                dispatch(postLogin({
                    isLoggedIn: true, 
                    userProfile: data, 
                    isLoginDialogOpen: false
                }));

                console.log(getState())
            })
            .catch((err) => {
                console.log(err)
                dispatch(postLogin({
                    isLoggedIn: false, 
                    errorCode: err.response.status
                }));
                console.log(getState())

            })
        }
    }
}

const preLogin = () => {
    return {
        type: ACTION_TYPE.PRE_LOGIN,
        payload: {
            loading: true,
            errorCode: ""
        }
    }
}

const postLogin = ({ isLoggedIn, errorCode, isLoginDialogOpen, userProfile={} }) => {
    return {
        type: ACTION_TYPE.POST_LOGIN,
        payload: {
            loading: false,
            isLoggedIn: isLoggedIn,
            userProfile,
            errorCode,
            isLoginDialogOpen
        }
    }
}

export const logout = () => {
    return function (dispatch, getState) {
        const { config } = getState();

        dispatch(preLogout());

        return axios.post(`${config.REST_BASE_URL}/auth/logout`)
        .then(() => {
            removeData(LOGIN_STORAGE_KEY)

            dispatch(postLogout({isLoggedIn: false})) 
        })
        .catch((err) => {
            console.log("Error while logout: ", err.statusCode)
            console.debug(err)
        })
        
    }
}

export const preLogout = () => {
    return {
        type: ACTION_TYPE.PRE_LOGOUT,
        payload: {
            loading: true,
            errorCode: ""
        }
    }
}

export const postLogout = ({isLoggedIn, errorCode="", userProfile={}}) => {
    return {
        type: ACTION_TYPE.POST_LOGOUT,
        payload: {
            loading: false,
            isLoggedIn: isLoggedIn,
            userProfile: userProfile,
            errorCode: errorCode
        }
    }
}

export const register = (userObject) => {
    return function (dispatch, getState) {
        const { config } = getState();

        dispatch(preRegister());

        return axios.post(`${config.REST_BASE_URL}/auth/register`, userObject)
        .then(({ data }) => dispatch(postRegister()) )
        .catch((err) => {
            console.log(err)
            dispatch(postRegister({
                errorCode: err.response.status
            }));
        })
    }
}

const preRegister = () => {
    return {
        type: ACTION_TYPE.PRE_REGISTER,
        payload: {
            loading: true
        }
    }
}

const postRegister = ({ errorCode }) => {
    return {
        type: ACTION_TYPE.POST_REGISTER,
        payload: {
            loading: false,
            errorCode
        }
    }
}