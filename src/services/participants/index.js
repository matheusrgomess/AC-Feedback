import { api } from '../../api'


export async function listParticipants() {
  const response = await api.get(`/list-participants?email=juan.lima@acdigital.com.br`)
  return response.data
}