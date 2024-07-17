import { api } from "api";

export async function postActivateGroup() {
    const response = await api.post("/activate-group")
    return response.data
}