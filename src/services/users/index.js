import { api } from "../../api";

export async function listUsers() {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await api.get(`/list-participants?email=${user.email}`);
  return response.data.participants;
}

export async function createUser(body) {
  const response = await api.post("/user", body);
  return response.data;
}

export async function editUser(userId, newValues) {
  const response = await api.put(`/admin/user/${userId}`, newValues);
  return response.data;
}

export async function deleteUser(userId) {
  const response = await api.delete(`/admin/user/${userId}`);
  return response.data;
}

export async function listAllUsers() {
  const response = await api.get("/list-participants");
  return response.data.participants;
}

export async function authentifyUser(loginUser) {
  const response = await api.post("/login-user", loginUser);
  return response;
}

export async function registerUser(registerUser) {
  const response = await api.post("/register", registerUser);
  return response
}

export async function logoutUser() {
  const response = await api.post('/sign-out')
  return response
}
