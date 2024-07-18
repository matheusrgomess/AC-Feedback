import { api } from "api";

export async function editParticipant(participantId, newValues) {
  const response = await api.put(`/user/${participantId}`, newValues);
  return response.data;
}
