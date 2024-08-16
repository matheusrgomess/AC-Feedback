import { api } from "api";

export async function printQuestionSet() {
  const response = await api.get("/list-questions");
  return response.data;
}

export async function createQuestionSet(group) {
  const response = await api.post("/admin/question", { questionSet: group });
  return response.data;
}

export async function editQuestionSet(questionId, newChanges) {
  const response = await api.put(`/admin/question/${questionId}`, newChanges);
  return response.data;
}

export async function deleteQuestionSet(questionId) {
  const response = await api.delete(`/admin/question/${questionId}`);
  return response.data;
}

export async function postActivateGroup(nameGroup) {
  const response = await api.post("/admin/activate-question-set", {
    questionSetTitle: nameGroup,
  });
  return response.data;
}

export async function getActivatedGroup() {
  const response = await api.get("/activated-group");
  return response.data.activatedQuestionSet;
}
