import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {filterValueType, TaskType} from "./App";
import ts from "typescript/lib/tsserverlibrary";

type PropsType={
    filter:filterValueType
    title:string
    tasks:Array<TaskType>
    removeTask:(taskId:string)=>void
    chancheFilter:(value:filterValueType) =>void
    changeStatuse:(taskId:string, isDone:boolean)=>void
    addTask:(title:string)=>void
}


function TodoList(props:PropsType) {
    const[title,setTitle]=useState<string>("")
    const [error,setError]=useState<string|null>(null)
    const addTask=()=>{
        const taskTitle=title.trim();
        if (taskTitle){
            props.addTask(taskTitle)
            setTitle("")
        } else {
            setError("Title is required")
        }


    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    {   setError(null)
        setTitle(e.currentTarget.value)}
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
                    value={title}
                    className={error?"error":""}
                />
                {error&&<div className={"error-message"}>{error}</div>}
                <button onClick={addTask} >+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task =>{
                        const changeStatuse = (e:ChangeEvent<HTMLInputElement>)=>
                            props.changeStatuse(task.id, e.currentTarget.checked)
                        return(
                            <li className={task.isDone?"is-done":""}
                                key={task.id}><input
                                onChange={changeStatuse}
                                type="checkbox"
                                checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={()=>{props.removeTask(task.id)}}>X</button></li>
                        )
                    })
                }

            </ul>
            <div>
                <button className={props.filter==="All"?"active-filter":""}
                        onClick={onAllClickHandler} >All</button>
                <button
                    className={props.filter==="active"?"active-filter":""}
                    onClick={onActiveClickHandler} >Active</button>
                <button
                    className={props.filter==="completed"?"active-filter":""}
                    onClick={onComlitedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
export default TodoList;