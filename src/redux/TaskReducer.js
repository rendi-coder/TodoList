import {getData,setMainTaskName,getTasks,addNewTask} from '../api'

const SET_NAME_MAIN_TASK = "SET_NAME_MAIN_TASK"
const SET_TASKS="SET_TASKS"

let initialState={
        MainTask:"",
        tasks:[]
}

const TaskReducer = (state=initialState,action)=>{
    switch(action.type){

        case SET_TASKS: return{
            ...state,tasks:action.tasks
        }

        case SET_NAME_MAIN_TASK:
            return{...state,MainTask:action.text}
        default:
            return state;
    }
}

const setNameTaskAC=(text)=>({type:SET_NAME_MAIN_TASK,text})

export const getNameTask=(idTask)=>(dispatch)=>{
    getData(idTask).then(response=>{
        dispatch(setNameTaskAC(response));
    })
}

export const setNameTask=(text,idTask)=>(dispatch)=>{
    setMainTaskName(text,idTask).then(response=>{
        dispatch(setNameTaskAC(response.data.taskName));
    })
}

const setTasks=(tasks)=>({type:SET_TASKS,tasks})

export const getAllTasks=(idTask)=>(dispatch)=>{
        getTasks(idTask).then(response=>{
        dispatch(setTasks(response.data));
    })
}

export const addTask=(task,idTask)=>(dispatch)=>{
    addNewTask(task,idTask).then(response=>{
        dispatch(setTasks(response.data));
    })
}

export default TaskReducer