import { api } from "api";

export async function editQuestionSet(questionId) {
    const response = await api.put(`/question/${questionId}`)
    return response.data
}