import axios from "axios";

const apiClient=axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)

export const updateTodoApi = (status,id, todo)=>apiClient.put(`/${status}/todos/${id}`,todo)

export const createTodoApi = (status, todo)=>apiClient.post(`/${status}/todos`,todo)