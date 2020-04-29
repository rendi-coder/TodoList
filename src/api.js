import Axios from 'axios'



export const getData=(id)=>{
     return  Axios.get(`https://todolist-a27f4.firebaseio.com/Todo/${id}/taskName.json`).then(response=>{
        return response.data.taskName;
    })
    }


export const setMainTaskName=(taskName,id)=>{
    return Axios.put(`https://todolist-a27f4.firebaseio.com/Todo/${id}/taskName.json`,{taskName}).then(response=>{
        return response;
    })
}

export const addNewTask=(task,id)=>{
    return Axios.put(`https://todolist-a27f4.firebaseio.com/Todo/${id}/taski.json`,task).then(response=>{
        return response;
    })
}

export const getTasks=(id)=>{
   return Axios.get(`https://todolist-a27f4.firebaseio.com/Todo/${id}/taski.json`).then(response=>{
        return response;
    })
}