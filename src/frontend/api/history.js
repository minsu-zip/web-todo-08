import { API } from '.'

export const getHistory = (resCallback) =>
  API.get('/api/history').then(resCallback)
