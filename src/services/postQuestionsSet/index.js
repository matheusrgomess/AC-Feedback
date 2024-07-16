import { api } from '../../api';

export async function createQuestionSet(group) {
    const response = await api.post("/question", {questionSet: group})
    return response.data
}