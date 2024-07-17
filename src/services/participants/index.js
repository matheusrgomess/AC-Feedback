import { api } from '../../api'

export async function listParticipants() {
  const user = JSON.parse(localStorage.getItem("user"));

  const response = await api.get(`/list-participants?email=${user.email}`)
  return response.data.participants
}