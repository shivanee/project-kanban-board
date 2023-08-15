import ListTodoComponent from './ListTodoComponent'
import ListInProgressComponent from './ListInProgressComponent'
import ListDoneComponent from './ListDoneComponent'
import { useNavigate } from 'react-router-dom'

export default function KanbanBoardComponent(){

    const navigate=useNavigate()

    function addNewTodo(){
        navigate('/kanban/add')
    }
    
    return(
        <div className='Welcome'>
            <div className="d-flex justify-content-around d-grid gap-3">
                <ListTodoComponent/>
                <ListInProgressComponent/>
                <ListDoneComponent/>
            </div>
            <div className='btn btn-dark m-3' onClick={addNewTodo}>Add New Todo</div>
        </div>
    )
}