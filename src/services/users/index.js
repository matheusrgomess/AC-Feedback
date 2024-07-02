import { api } from '../../api'


export async function createUser(body) {
  const response = await api.post('/user', body)
  return response.data
}