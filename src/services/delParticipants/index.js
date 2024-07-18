import { api } from "api";

export async function deleteParticipant(participantId) {
    const response = await api.delete(`/user/${participantId}`)
    return response.data
}