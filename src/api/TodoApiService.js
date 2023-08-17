import axios from "axios";

const apiClient=axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)

export const retrieveTodoApi = (status,id)=>apiClient.get(`/${status}/todos/${id}`)

export const updateTodoApi = (status,id, todo)=>apiClient.put(`/${status}/todos/${id}`,todo)

export const createTodoApi = (status, todo)=>apiClient.post(`/${status}/todos`,todo)