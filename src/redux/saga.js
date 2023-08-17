import { takeEvery, put, takeLatest } from "redux-saga/effects";

function* getTasks(action) {
  let data = yield fetch(`http://localhost:8080/${action.payload}/todos`);
  data = yield data.json();
  switch (action.payload) {
    case "To_Do":
      yield put({ type: "SET_TODO", data });
      break;
    case "In_Progress":
      yield put({ type: "SET_IN_PROGRESS", data });
      break;
    case "Done":
      yield put({ type: "SET_DONE", data });
      break;
    default:
  }
}

function* deleteTask(action) {
  yield fetch(
    `http://localhost:8080/${action.payload.status}/todos/${action.payload.id}`,
    { method: "DELETE" }
  );
  let data = yield fetch(
    `http://localhost:8080/${action.payload.status}/todos`
  );
  data = yield data.json();
  switch (action.payload.status) {
    case "To_Do":
      yield put({ type: "SET_TODO", data });
      break;
    case "In_Progress":
      yield put({ type: "SET_IN_PROGRESS", data });
      break;
    case "Done":
      yield put({ type: "SET_DONE", data });
      break;
    default:
  }
}

function* getTaskById(action) {
  let data = yield fetch(
    `http://localhost:8080/${action.payload.status}/todos/${action.payload.id}`
  );
  data = yield data.json();
  yield put({ type: "SET_TASK", data });
}

export default function* saga() {
  yield takeEvery("GET_TASKS", getTasks);
  yield takeLatest("DELETE_TASK", deleteTask);
  yield takeLatest("GET_TASK_BY_ID", getTaskById);
}
