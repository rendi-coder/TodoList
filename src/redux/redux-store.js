import { createStore,combineReducers,applyMiddleware } from 'redux'
import TaskReducer from './TaskReducer'
import  thunkMiddleware from "redux-thunk"

let reducers=combineReducers({
    tasks:TaskReducer
});

let store=createStore(reducers,applyMiddleware(thunkMiddleware));

window.store=store;

export default store;
