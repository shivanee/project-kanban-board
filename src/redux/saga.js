import { takeEvery, put } from "redux-saga/effects";

function* getTodo() {
  let data = yield fetch('http://localhost:8080/To_Do/todos');
  data = yield data.json();
  yield put({ type: "SET_TODO", data });
}

function* getInProgress() {
  let data = yield fetch('http://localhost:8080/In_Progress/todos');
  data = yield data.json();
  yield put({ type: "SET_IN_PROGRESS", data });
}

function* getDone() {
  let data = yield fetch('http://localhost:8080/Done/todos');
  data = yield data.json();
  yield put({ type: "SET_DONE", data });
 }

export default function* saga() {
  yield takeEvery("GET_TODO", getTodo);
  yield takeEvery("GET_IN_PROGRESS", getInProgress);
  yield takeEvery("GET_DONE", getDone);
}
