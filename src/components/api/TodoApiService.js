import axios from "axios";

const apiClient=axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)

export const retieveAllTodosForStatusApi = (status)=>apiClient.get(`/${status}/todos`)

export const deleteTodoApi = (status,id)=>apiClient.delete(`/${status}/todos/${id}`)

export const retrieveTodoApi = (status,id)=>apiClient.get(`/${status}/todos/${id}`)