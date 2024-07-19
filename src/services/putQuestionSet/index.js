import { api } from "api";

export async function editQuestionSet(questionId, newChanges) {
    const response = await api.put(`/question/${questionId}`, newChanges)
    return response.data
}