import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {filterValueType, TaskType} from "./App";
import ts from "typescript/lib/tsserverlibrary";

type PropsType={
    id:string
    filter:filterValueType
    title:string
    tasks:Array<TaskType>
    removeTask:(taskId:string, todolistID:string)=>void
    chancheFilter:(value:filterValueType,todolistID:string ) =>void
    changeStatuse:(taskId:string, isDone:boolean,todolistID:string )=>void
    addTask:(title:string, todolistID:string)=>void
    removeTodolist:(todolistID: string)=>void
}


function TodoList(props:PropsType) {
    const[title,setTitle]=useState<string>("")
    const [error,setError]=useState<string|null>(null)
    const addTask=()=>{
        const taskTitle=title.trim();
        if (taskTitle){
            props.addTask(taskTitle,props.id)
            setTitle("")
        } else {
            setError("Title is required")
        }


    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    {   setError(null)
        setTitle(e.currentTarget.value)}
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {if(e.key === "Enter") addTask()}
    const onAllClickHandler = ()=>{props.chancheFilter("All",props.id)}
    const onActiveClickHandler = ()=>{props.chancheFilter("active",props.id)}
    const onComlitedClickHandler = ()=>{props.chancheFilter("completed",props.id)}
    const onRemoveTodolist = (e:  React.MouseEvent<HTMLButtonElement>)=>{props.removeTodolist(props.id)}


    // const onChancheHandler=(e:ChangeEvent<HTMLInputElement>)=>{
    //     setTitle(e.currentTarget.value)
    // }
    // const onKeyPressHandler=(e:KeyboardEvent<HTMLInputElement>)=>{
    //     if(e.key==="Enter") addTask()
    // }
    return(
        <div>
            <h3>{props.title}<button onClick={onRemoveTodolist}>X</button></h3>
            <div>
                <input
                    onKeyPress={onKeyPress}
                    onChange={onChangeHandler}
                    value={title}
                    className={error?"error":""}
                />

                <button onClick={addTask} >+</button>
                {error&&<div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(task =>{
                        const changeStatuse = (e:ChangeEvent<HTMLInputElement>)=>
                            props.changeStatuse(task.id, e.currentTarget.checked,props.id)
                        return(
                            <li className={task.isDone?"is-done":""}
                                key={task.id}><input
                                onChange={changeStatuse}
                                type="checkbox"
                                checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={()=>{props.removeTask(task.id,props.id)}}>X</button></li>
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