import { api } from "../../api";


export async function getFeedbacks(participantName, limit, startDate, endDate) {
  console.log(participantName)
  const response = await api.get('/list-feedbacks', {
    params: {
      participantName: participantName,
      limit,
      startDate: startDate,
      endDate: endDate,
    }
  })
  return response.data
}