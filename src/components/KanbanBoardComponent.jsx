import ListTodoComponent from './ListTodoComponent'
import ListInProgressComponent from './ListInProgressComponent'
import ListDoneComponent from './ListDoneComponent'

export default function KanbanBoardComponent(){
    return(
        <div className='Welcome'>
            <div className="d-flex justify-content-around d-grid gap-3">
                <ListTodoComponent/>
                <ListInProgressComponent/>
                <ListDoneComponent/>
            </div>
        </div>
    )
}