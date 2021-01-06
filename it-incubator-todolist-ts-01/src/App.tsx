import React, {useState} from 'react';
import './App.css';
import TodoList from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}
export type filterValueType = "All" | "active" | "completed"
type TaskStateType = {
    [key: string]: Array<TaskType>
}

type ToDoListType = {
    id: string
    title: string
    filter: filterValueType
}

function App() {
    const todolistID1 = v1()
    const todolistID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<ToDoListType>>([
        {id: todolistID1, title: "What to learn", filter: "All"},
        {id: todolistID2, title: "What to buy", filter: "All"},
    ])


    const [tasks, setTasks] = useState<TaskStateType>(
        {
            [todolistID1]: [{id: v1(), title: "AAA", isDone: false},
                {id: v1(), title: "BBB", isDone: true}]
            ,

            [todolistID2]: [{id: v1(), title: "CCC", isDone: false},
                {id: v1(), title: "DDD", isDone: true}]
        }
    )


    function addTask(newTaskTitle: string, todolistID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        tasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks({...tasks})

    }


    function removeTask(taskId: string, todolistID: string) {
        tasks[todolistID] = tasks[todolistID].filter(task => task.id !== taskId)
        setTasks({...tasks})
    }

    let [filter, setFilter] = useState<filterValueType>("All")

    function chancheFilter(FilterValue: filterValueType, todolistID: string) {
        const todoList = todoLists.find(tl => tl.id === todolistID)
        if (todoList) {
            todoList.filter = FilterValue
            setTodoLists([...todoLists])
        }
        setFilter(FilterValue)
    }

    /*let tasksForTodolist = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone == false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone == true);
    }*/
    function changeStatuse(taskId: string, isDone: boolean, todolistID: string) {
        const todoListTasks = tasks[todolistID]
        const task = todoListTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    function removeTodolist(todolistID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }

    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    let tasksForTodolist = tasks[tl.id]
                    if (tl.filter === "active") {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone == false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone == true);
                    }
                    return (
                        <TodoList
                            removeTodolist={removeTodolist}
                            key={tl.id}
                            id={tl.id}
                            filter={tl.filter}
                            tasks={tasksForTodolist}
                            title={tl.title}
                            removeTask={removeTask}
                            chancheFilter={chancheFilter}
                            addTask={addTask}
                            changeStatuse={changeStatuse}
                        />)
                })
            }

        </div>
    );
}


export default App;
