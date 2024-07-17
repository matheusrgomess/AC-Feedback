import { api } from "api";

export async function postActivateGroup(nameGroup) {
  const response = await api.post("/activate-group", {
    questionSetTitle: nameGroup,
  });
  return response.data;
}
