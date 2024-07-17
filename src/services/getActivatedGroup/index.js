import { api } from "api";

export async function getActivatedGroup() {
    const response = await api.get("/activated-group")
    return response.data.activatedQuestionSet
}