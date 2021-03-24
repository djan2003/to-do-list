import axios from 'axios'

const instance = axios.create({
        baseURL: "https://social-network.samuraijs.com/api/1.1/",
        withCredentials: true,
        headers: {
            "API-KEY": "6914c902-ebb2-47bd-8235-de43c8962e59"
        }

    })
type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<D={}> = {
    resultCode: number
    messages: Array<string>
    data: D
}



export const todolistAPI = {
    getTodolist() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${todolistId}`,
            {title: title})
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{
            item: TodolistType
        }>>(`todo-lists/`,
            {title: "newTodolist"})
        return promise
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    }

}

