import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { retieveAllTasks, deleteTask } from "../redux/action";
import { updateTodoApi } from "../api/TodoApiService";

export default function ListDoneComponent() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isHovering,setIsHovering]=useState(-1)

  useEffect(() => {
    dispatch(retieveAllTasks("Done"));
  }, []);

  let todos = useSelector((state) => state.todoData.done);

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
      status: "Done",
    };
    updateTodoApi("Done", droppedId, todo)
      .then(() => {
        dispatch(retieveAllTasks("To_Do"));
        dispatch(retieveAllTasks("In_Progress"));
        dispatch(retieveAllTasks("Done"));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      droppable="true"
      onDragOver={(e) => dragOver(e)}
      onDrop={(e) => dragDropped(e)}
      className="container p-2"
    >
      <div>
        <h4 className="container p-2 card text-bg-success mb-3">Done</h4>
        <ul className="list-unstyled">
          {todos.map((todo) => (
            <li
              className="d-flex justify-content-around d-grid gap-3 mb-3"
              key={todo.id}
              draggable="true"
              onDragStart={(e) => dragStarted(e, todo.id, todo.title)}
              onMouseEnter={()=>setIsHovering(todo.id)}
              onMouseLeave={()=>setIsHovering(-1)}
            >
              <span className="p-2 mb-3">{todo.title}</span>
              <span className=" d-grid gap-3 justify-content-end">
              {isHovering===todo.id &&<img
                  className="img gap-3 rounded float-right"
                  src="/delete.png"
                  alt="image"
                  onClick={() => dispatch(deleteTask(todo.status, todo.id))}
                  width="20px"
                  height="20px"
                />}
                {isHovering===todo.id &&
                <img
                  className="img gap-3 rounded float-right"
                  src="/edit.png"
                  alt="image"
                  onClick={() => editTodo(todo.id)}
                  width="20px"
                  height="20px"
                />}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
