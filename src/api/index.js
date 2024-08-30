import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 60000,
});

const whiteListURLs = ['/login-user', '/register']

api.interceptors.request.use(request => {
  const token = JSON.parse(sessionStorage.getItem('user'))?.token_access
  const isWhiteList = !whiteListURLs.includes(request.url)
  if (token && isWhiteList) {
    request.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...request.headers
    }

  }

  return request
})