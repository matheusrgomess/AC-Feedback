import { api } from "api";

export async function printQuestionSet() {
    const response = await api.get("/list-questions")
    return response.data
}