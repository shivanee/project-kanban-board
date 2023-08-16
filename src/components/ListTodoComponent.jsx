import { useEffect,useState} from "react";
import { deleteTodoApi } from "../api/TodoApiService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { retieveAllTodo } from "../redux/action";

export default function ListTodoComponent() {
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  let result = useSelector((state) => state.todoData);

  useEffect(() => {
    dispatch(retieveAllTodo());
  },[]);

  setTodos(result.todo)


  function deleteTodo(id) {
    deleteTodoApi("To_Do", id)
      .then(() => {
        //refreshTodos();
      })
      .catch((error) => console.log(error));
  }

  function updateTodo(id) {
    navigate(`/kanban/${id}`);
  }

  return (
    <div className="container p-2">
      <div>
        <h4 className="container p-2 card text-bg-primary mb-3">To Do</h4>
        <ul className="list-unstyled">
          {result.map((todo) => (
            <li
              className="d-flex justify-content-around d-grid gap-3"
              key={todo.id}
              draggable
            >
              <span className="p-2 mb-3">{todo.title}</span>
              <span className=" d-flex d-grid gap-3 justify-content-end">
                <button
                  className="btn btn-info p-2 mb-2"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-secondary p-2 mb-2"
                  onClick={() => updateTodo(todo.id)}
                >
                  Update
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
