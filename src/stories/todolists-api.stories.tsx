
import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data);
            })

    }, [])


        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-к

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist("NewTodolist").then((res)=>{
            setState(res.data);
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTodolist("3518087b-5434-43a2-9727-c58bb24d871e")
            .then( (res) => {
            setState(res.data);
        })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = 'ab9ba305-de15-4e0d-ae79-a79bf9dc1d44'
        const title="AAAAAAAAAAAAAAAAAAAAAA"
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}

