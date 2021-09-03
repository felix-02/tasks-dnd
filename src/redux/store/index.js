import { combineReducers, createStore } from "redux";
import toastReducer from "../toastReducer";
import todoReducer from "../todoReducer";

const rootReducer = combineReducers({ task: todoReducer, toast: toastReducer });

const store = createStore(rootReducer);

export default store;
