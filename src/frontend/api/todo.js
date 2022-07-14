import { API } from '.'

const getList = (resCallback) => API.get('/api/todos').then(resCallback)

const TodoAPI = {
  getList,
}

export default TodoAPI
