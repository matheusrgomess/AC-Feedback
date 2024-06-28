import { api } from '../../api'


export async function listParticipants() {
  const response = await api.get('/list-participants')
  return response.data
}