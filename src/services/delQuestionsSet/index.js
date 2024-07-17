import { api } from "api";

export async function deleteQuestionSet(questionId) {
    const response = await api.del(`/question/${questionId}`)
    return response.data
}