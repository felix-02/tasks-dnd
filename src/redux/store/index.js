import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import toastReducer from "../toastReducer";
import todoReducer from "../taskReducer";

const rootReducer = combineReducers({ task: todoReducer, toast: toastReducer });

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
