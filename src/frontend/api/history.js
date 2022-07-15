import { API } from '.'

export const getHistory = (resCallback) =>
  API.get('/api/history').then(resCallback)

export const postHistory = (body, resCallback) => {
  API.post('/api/history', body).then(resCallback)
}
