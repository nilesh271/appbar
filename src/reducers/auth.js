import {ACTION_TYPE} from '../actions/auth'

const defaultState = {
    loading: false,
    isLoggedIn: false,
    isLoginDialogOpen: false,
    userProfile: {},
    errorCode: ""
}

function authReducer(state=defaultState, {type, payload={}}) {
    switch (type) {
        case ACTION_TYPE.TOGGLE_LOGIN:
            return {...state, isLoginDialogOpen: !state.isLoginDialogOpen}
        
        case ACTION_TYPE.PRE_LOGIN:
            return {...state, loading: payload.loading}

        case ACTION_TYPE.POST_LOGIN:
            return {...state, 
                loading: payload.loading, 
                isLoggedIn: payload.isLoggedIn, 
                userProfile: {...state.userProfile, ...payload.userProfile},
                errorCode: payload.errorCode || state.errorCode,
                isLoginDialogOpen: payload.isLoginDialogOpen
            }
        
        case ACTION_TYPE.POST_LOGIN:
            return {...state, 
                loading: payload.loading, 
                isLoggedIn: payload.isLoggedIn, 
                userProfile: {...state.userProfile, ...payload.userProfile}
            }

        case ACTION_TYPE.PRE_LOGOUT:
            return {
                ...state,
                loading: payload.loading,
                errorCode: payload.errorCode
            }
        case ACTION_TYPE.POST_LOGOUT:
            return {
                ...state,
                loading: payload.loading,
                isLoggedIn: payload.isLoggedIn, 
                userProfile: payload.userProfile, 
                errorCode: payload.errorCode
            }
        default:
            return state
    }
}

export default authReducer