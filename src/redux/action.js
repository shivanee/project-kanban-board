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

export const retieveTaskById = (status,id)=>{
    
    return {
        type:"GET_TASK_BY_ID",
        payload:{status,id}
    }
}
