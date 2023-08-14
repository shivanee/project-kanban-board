import { useParams } from 'react-router-dom'
import ListTodoComponent from './ListTodoComponent'

export default function WelcomeComponent(){
    const {username}=useParams()

    return(
        <div className='Welcome'>
            <h1>Welcome {username} To Your Kanban Board</h1>
            <ListTodoComponent/>
        </div>
    )
}