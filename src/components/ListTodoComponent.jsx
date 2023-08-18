import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { retieveAllTasks, deleteTask } from "../redux/action";
import { updateTodoApi } from "../api/TodoApiService";

export default function ListTodoComponent() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retieveAllTasks("To_Do"));
  }, []);

  let todos = useSelector((state) => state.todoData.todo);

  function editTodo(id) {
    navigate(`/kanban/${id}`);
  }

  const dragStarted = (e, id, title) => {
    e.dataTransfer.setData("id", id);
    e.dataTransfer.setData("title", title);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragDropped = (e) => {
    let droppedId = e.dataTransfer.getData("id");
    let droppedTitle = e.dataTransfer.getData("title");
    const todo = {
      id: droppedId,
      title: droppedTitle,
      status: "To_Do",
    };
    updateTodoApi("To_Do", droppedId, todo)
      .then(() => {
        dispatch(retieveAllTasks("To_Do"));
        dispatch(retieveAllTasks("In_Progress"));
        dispatch(retieveAllTasks("Done"));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      droppable
      onDragOver={(e) => dragOver(e)}
      onDrop={(e) => dragDropped(e)}
      className="container p-2"
    >
      <div>
        <h4 className="container p-2 card text-bg-primary mb-3">To Do</h4>
        <ul className="list-unstyled">
          {todos.map((todo) => (
            <li
              className="d-flex justify-content-around d-grid gap-3"
              key={todo.id}
              draggable
              onDragStart={(e) => dragStarted(e, todo.id, todo.title)}
            >
              <span className="p-2 mb-3">{todo.title}</span>
              <span className=" d-flex d-grid gap-3 justify-content-end">
                <button
                  className="btn btn-info p-2 mb-2"
                  onClick={() => dispatch(deleteTask(todo.status, todo.id))}
                >
                  Delete
                </button>
                <button
                  className="btn btn-secondary p-2 mb-2"
                  onClick={() => editTodo(todo.id)}
                >
                  Edit
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
