import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    const dispatch=useDispatch()
    const todolists=useSelector<AppRootStateType,Array<TodolistType>>(state => state.todolists)
    const tasks=useSelector<AppRootStateType,TasksStateType>(state => state.tasks)

    const removeTask= useCallback((id: string, todolistId: string)=> {
        dispatch(removeTaskAC(todolistId, id))
    },[])

    const addTask=useCallback( (title: string, todolistId: string)=> {
        dispatch(addTaskAC(title,todolistId))
    },[])

    const changeStatus=useCallback((id: string, isDone: boolean, todolistId: string)=> {
        dispatch(changeTaskStatusAC(id,isDone, todolistId))
    },[])  

    const changeTaskTitle=useCallback((id: string, newTitle: string, todolistId: string)=> {
        dispatch(changeTaskTitleAC(id,newTitle,todolistId))
    },[])  


    const changeFilter=useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId,value))
    },[]) 

    const removeTodolist=useCallback( (id: string) =>{
        dispatch(removeTodolistAC(id))


        /* // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
         setTodolists(todolists.filter(tl => tl.id != id));
         // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
         delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
         // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
         setTasks({...tasks});*/
    },[]) 

    const changeTodolistTitle=useCallback((id: string, title: string)=> {
        dispatch(changeTodolistTitleAC(id,title))
    },[])
    const addTodolist=useCallback((title: string)=> {
        let action=addTodolistAC(title)
        dispatch(action)
    },[])




    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
