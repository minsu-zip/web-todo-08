import { API } from '.'

const getList = (resCallback) => API.get('/api/todos').then(resCallback)

const patch = (id, body, resCallback) =>
  API.patch(`/api/todos/${id}`, body).then(resCallback)

const post = (body, resCallback) =>
  API.post(`/api/todos`, body).then(resCallback)

const TodoAPI = {
  getList,
  patch,
  post,
}

export default TodoAPI
