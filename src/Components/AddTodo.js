import React from 'react'
import Axios from 'axios'
import classes from './Task.module.css'
import Task from './Task'

class AddTodoList extends React.Component{

    state={
        toogle:false,
        inputValue:"",
        listTasks:null
    }


    componentDidMount(){
        Axios.get(`https://todolist-a27f4.firebaseio.com/Todo.json`)
        .then(resp=>this.setState({listTasks:resp.data}));
    }

    chanheInputValue=(e)=>{
        this.setState({inputValue:e.target.value})
    }

    Back=()=>{
        this.setState({toogle:!this.state.toogle})
    }

    addNewTask=()=>{
        if(this.state.listTasks){
               Axios.get(`https://todolist-a27f4.firebaseio.com/Todo.json`).then(resp=>{
                   return resp.data;})
                   .then(data=>{
                    let newdata=[...data,{taskName:{taskName:this.state.inputValue}}]
                    Axios.put(`https://todolist-a27f4.firebaseio.com/Todo.json`,newdata).then(response=>{
                        this.setState({listTasks:response.data,toogle:!this.state.toogle})
                    })
             })
            }
            else{let newdata=[{taskName:{taskName:this.state.inputValue}}]
            Axios.put(`https://todolist-a27f4.firebaseio.com/Todo.json`,newdata).then(response=>{
                this.setState({listTasks:response.data,toogle:!this.state.toogle,inputValue:''})
            })}
    }

        addNewTodo=()=>{
            this.setState({toogle:!this.state.toogle})
        }
    
        deleteTask=(id)=>{
            Axios.get(`https://todolist-a27f4.firebaseio.com/Todo.json`).then(resp=>{
                   return resp.data;})
                   .then(data=>{
                    data.splice(id,1);
                    Axios.put(`https://todolist-a27f4.firebaseio.com/Todo.json`,data).then(response=>{
                        
                        this.setState({listTasks:response.data})
                    })
             })
        }

    render(){
        
    return (
        
        <div >
            {this.state.listTasks&&this.state.listTasks.map((_,i)=><Task idTask={i} key={i} deleteTask={this.deleteTask}/>)}
            <div style={{marginTop:"8%"}} >
                {!this.state.toogle?
                <button onClick={this.addNewTodo} style={{backgroundColor:"rgb(15, 120, 204)",color:'white',width:150,height:50,fontSize:18,cursor:'pointer'}}>Add TODO List</button>
                :<div className={classes.newTaskName}>
                <label htmlFor="name">input Name Task   </label>
                <input id="name" style={{width:'50%',height:'20px',fontSize:'20px'}} value={this.state.inputValue} onChange={this.chanheInputValue}/>
                <button style={{marginLeft:"5px",backgroundColor:"yellow"}} onClick={this.addNewTask}>AddTASK</button> <button style={{marginLeft:"5px",backgroundColor:"gray"}} onClick={this.Back}>Back</button>
                </div>
                }
            </div>
        </div>
    )
    }
}
export default AddTodoList