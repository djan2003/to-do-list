import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {filterValueType, TaskType} from "./App";

type PropsType={
    title:string
    tasks:Array<TaskType>
    removeTask:(taskId:string)=>void
    chancheFilter:(value:filterValueType) =>void
    addTask:(title:string)=>void
}


function TodoList(props:PropsType) {
    const[title,setTitle]=useState<string>("")
    const addTask=()=>{
        props.addTask(title)
        setTitle("")

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {if(e.key === "Enter") addTask()}
    const onAllClickHandler = ()=>{props.chancheFilter("All")}
    const onActiveClickHandler = ()=>{props.chancheFilter("active")}
    const onComlitedClickHandler = ()=>{props.chancheFilter("completed")}


    // const onChancheHandler=(e:ChangeEvent<HTMLInputElement>)=>{
    //     setTitle(e.currentTarget.value)
    // }
    // const onKeyPressHandler=(e:KeyboardEvent<HTMLInputElement>)=>{
    //     if(e.key==="Enter") addTask()
    // }
    return(
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    onKeyPress={onKeyPress}
                    onChange={onChangeHandler}
                    value={title}/>
                <button onClick={addTask} >+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task =>{
                        return(
                            <li><input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={()=>{props.removeTask(task.id)}}>X</button></li>
                        )
                    })
                }

            </ul>
            <div>
                <button onClick={onAllClickHandler} >All</button>
                <button onClick={onActiveClickHandler} >Active</button>
                <button onClick={onComlitedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
export default TodoList;