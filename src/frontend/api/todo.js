import { API } from '.'

const getList = (resCallback) => API.get('/api/todos').then(resCallback)

const patch = (id, body, resCallback) =>
  API.patch(`/api/todos/${id}`, body).then(resCallback)

const TodoAPI = {
  getList,
  patch,
}

export default TodoAPI
