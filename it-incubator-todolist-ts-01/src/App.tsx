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

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "AAA", isDone: false},
        {id: v1(), title: "BBB", isDone: true},
        {id: v1(), title: "CCC", isDone: false},
        {id: v1(), title: "DDD", isDone: true},
    ])

    function addTask(newTaskTitle:string) {
        const newTask: TaskType = {
            id: v1(),
            title:newTaskTitle,
            isDone:false

        }
        setTasks([newTask, ...tasks])

    }



    function removeTask(taskId: string) {
        const newTasks = tasks.filter(task => task.id !== taskId)
        setTasks(newTasks)
    }

    let [filter, setFilter] = useState<filterValueType>("All")

    function chancheFilter(FilterValue: filterValueType) {
        setFilter(FilterValue)
    }

    let tasksForTodolist = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone == false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone == true);
    }
    return (
        <div className="App">
            <TodoList tasks={tasksForTodolist}
                      title={"What to learn"}
                      removeTask={removeTask}
                      chancheFilter={chancheFilter}
                      addTask={addTask}
            />
        </div>
    );
}


export default App;
