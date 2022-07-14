import { API } from '.'

export const getHistory = (resCallback) =>
  API.get('/api/historys').then(resCallback)
