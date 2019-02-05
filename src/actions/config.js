export const ACTION_TYPE = {
    GET_CONFIG: "GET_CONFIG"
}

export const getConfig = () => {
    return { 
        type: ACTION_TYPE.GET_CONFIG,
        payload: {}
    }
}