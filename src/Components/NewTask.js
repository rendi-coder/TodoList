import React from 'react'
import classes from './Task.module.css';

class NewTask extends React.Component{

    state={
        toogle:false,
        text:this.props.textTask,
        checked:this.props.checked,   
    }

    componentDidUpdate(prevProps,prevState){
        if(prevProps!==this.props){
            this.setState({
                text:this.props.textTask,
                checked:this.props.checked
            })
        }
    }

    OnToogle=()=>{
        this.setState({
            toogle:!this.state.toogle
        })
    }

    ChangeTextTask=(e)=>{
        this.setState({text:e.target.value})
    }

    OnChecked=(id)=>{
            this.props.chendgeChecked(id);
    }

    UpdateTask=()=>{
    this.OnToogle();
    this.props.ChangeText(this.props.id,this.state.text)
    }

    render(){
    return(
        <div className={classes.Tasks}> 
                         { !this.state.toogle?
                        <div className={classes.taskFill}>
                            <div className={classes.check}><input type="checkbox" checked={this.state.checked} onChange={()=>this.OnChecked(this.props.id)}/>  </div>
                            <div className={classes.TextTask}>{this.state.text}</div> 
                            <div className={classes.actionButton}>
                                <button onClick={()=>this.props.liftUp(this.props.id)}>Down</button>
                                <button onClick={()=>this.props.lowerDown(this.props.id)}>Up</button>
                                <button onClick={this.OnToogle}>update</button>
                                <button onClick={()=>this.props.deleteTask(this.props.id)}>delete</button> 
                           </div>
                        </div>
                        : <div className={classes.taskFill}>
                        <input autoFocus={true} onBlur={this.UpdateTask} className={classes.TextTask} value={this.state.text} onChange={(e)=>this.ChangeTextTask(e)}/>
                        <div className={classes.actionButton} style={{marginLeft:'33%'}}>
                            <button onClick={this.UpdateTask}>update</button>
                        </div> 
                        </div>
                    }
            </div>
        )
    }
}

export default NewTask