import { api } from "api";

export async function listAllParticipants() {
    const response = await api.get("/list-participants")
    return response.data.participants
  }