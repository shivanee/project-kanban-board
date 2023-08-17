export const retieveAllTasks = (status)=>{
    
    return {
        type:"GET_TASKS",
        payload:status
    }
}

export const deleteTask = (status,id)=>{
    
    return {
        type:'DELETE_TASK',
        payload:{status,id}
    }
}