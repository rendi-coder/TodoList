import React from 'react'
import classes from './Task.module.css';
import  NewTask from './NewTask'
import { connect } from 'react-redux';
import {setNameTask,addTask} from '../redux/TaskReducer';
import {getData,getTasks} from '../api'


class Task extends React.Component{
   
    componentDidMount(){
        getData(this.props.idTask).then(resp=>this.setState({nameTask:resp}));
        getTasks(this.props.idTask).then(resp=>this.setState({tasks:resp.data}));

    }

    componentDidUpdate(prevProps,prevState){
        if(prevProps!==this.props ){
            getTasks(this.props.idTask).then(resp=>this.setState({tasks:resp.data}));
        }
    }

    state={
        input:false,
        nameTask:'',
        textTask:"typing here to create task",
        touch:false,
        tasks:[]
    }


     UpdateTaskName=(e)=>{
       this.setState({nameTask:e.target.value});
    }

     changeInput=()=>{
        if(this.state.input && this.state.nameTask.length>0){
            this.props.setNameTask(this.state.nameTask,this.props.idTask);
        }
       this.setState({input:!this.state.input})
    }

    addNewTask=()=>{
        let task={check:false,text:this.state.textTask}
        if(!this.state.tasks){
            this.props.addTask([task],this.props.idTask);
        }
        else{
            let newTask=[...this.state.tasks,task]
            this.props.addTask(newTask,this.props.idTask);
        }
        this.setState({
            textTask:"typing here to create task",
            touch:false
        })
    }

    deleteTask= (key)=>{
        let delTaska=this.state.tasks[key].text;
        let tasks=[...this.state.tasks].filter((e)=>e.text!==delTaska);
        this.props.addTask(tasks,this.props.idTask);
    }

    InputTask=(e)=>{
        this.setState({textTask:e.target.value})
     }


     changeTouch=()=>{
        if(!this.state.touch){this.setState({touch:true,textTask:''});}
    }

    //taski
     chendgeChecked=(key)=>{
        let Ctasks=[...this.state.tasks]
        Ctasks[key].check=!this.state.tasks[key].check;
        this.props.addTask(Ctasks,this.props.idTask);
    }

    ChangeTextTask=(index,text)=>{
        let updatedTask=[...this.state.tasks];
        updatedTask[index].text=text;
        this.props.addTask(updatedTask,this.props.idTask);
    }

    liftUp=(index)=>{
        if(index!==this.state.tasks.length-1){
            let Ctasks=[...this.state.tasks];
            let temp=Ctasks[index+1];
            Ctasks[index+1]=Ctasks[index];
            Ctasks[index]=temp;
            this.props.addTask(Ctasks,this.props.idTask);
        }
    }

     lowerDown=(index)=>{
        if(index!==0){
            let Ctasks=[...this.state.tasks];
            let temp=Ctasks[index-1];
            Ctasks[index-1]=Ctasks[index];
            Ctasks[index]=temp;
            this.props.addTask(Ctasks,this.props.idTask);
        }
    }
    
    deleteTaskList=()=>{
       this.props.deleteTask(this.props.idTask);
    }

    render(){
        return(
        <div className={classes.table}>
            <div className={classes.task}>
                <div className={classes.inputToogle}>
                {!this.state.input?
                <div className={classes.text} >{this.state.nameTask}</div>
                :<input autoFocus={true} value={this.state.nameTask} onChange={(e)=>this.UpdateTaskName(e)}  />
                }
                </div>
                <div className={classes.UpdateDelete}> 
                    <div style={{marginRight:'10px'}} onClick={this.changeInput}> Update </div>
                    <div onClick={this.deleteTaskList}> Delete </div>
                </div>
            </div>
            <div className={classes.addTask}>
                <input className={classes.input} value={this.state.textTask}  onChange={(e)=>this.InputTask(e)} onClick={this.changeTouch}/>
                <button disabled={this.state.touch && this.state.textTask.length>0?null:true} onClick={this.addNewTask}>Add Task</button>
            </div >
            <div className={classes.taskList}>
                {this.state.tasks? this.state.tasks.map((task,key)=><NewTask textTask={task.text} key={key} id={key} 
                deleteTask={this.deleteTask} chendgeChecked={this.chendgeChecked} checked={task.check} ChangeText={this.ChangeTextTask}
                liftUp={this.liftUp} lowerDown={this.lowerDown}
                />) :null}
            </div>
        </div>
        )
    }
} 


let mapStateToProps=(state)=>{
    return{
        MainTaskName:state.tasks.MainTask,
        allTasks:state.tasks.tasks
    }
}
     
export default connect(mapStateToProps,{setNameTask,addTask})(Task)