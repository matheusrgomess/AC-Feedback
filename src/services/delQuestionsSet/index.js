import { api } from "api";

export async function deleteQuestionSet(questionId) {
    const response = await api.delete(`/question/${questionId}`)
    return response.data
}