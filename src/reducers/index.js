import { combineReducers } from "redux";
import authReducer from "./auth";
import configReducer from "./config";


export const rootReducer = combineReducers({
    auth: authReducer,
    config: configReducer
}); 