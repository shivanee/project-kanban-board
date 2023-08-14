export default function ListTodoComponent(){
    const todos=[{id:1, title:"Task1",status:"To Do"},
	{id:2,title:"Task2",status:"In Progress"},
	{id:3,title:"Task3",status:"Done"},
    {id:4,title:"Task4",status:"Done"}]

    return(
        <div className='container'>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>To Do</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo=>(
                                    <tr key={todo.title}>
                                        <td>{todo.id}</td>
                                        <td>{todo.title}</td> 
                                        <td>{todo.status}</td>
                                    </tr>                                   
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}