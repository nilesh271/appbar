import { ACTION_TYPE } from "../actions/config";

const defaultConfig = {
    REST_BASE_URL: "http://demo3935358.mockable.io/"
}

export default function (state=defaultConfig, {type, payload={}}) {
    switch (type) {
        case ACTION_TYPE.GET_CONFIG:
        default:
            return state;
    }
}

  