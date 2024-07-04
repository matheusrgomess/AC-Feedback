import { api } from '../../api'

export async function authentifyUser(loginUser) {
    const response = api.post('/login-user', loginUser)
    return response
}