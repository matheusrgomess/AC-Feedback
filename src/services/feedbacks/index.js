import { api } from "../../api";

export async function getFeedbacks(participantName, limit, startDate, endDate) {
  const response = await api.get("/list-feedbacks", {
    params: {
      participantName: participantName,
      limit,
      startDate: startDate,
      endDate: endDate,
    },
  });
  return response.data;
}

export async function postFeedback(data) {
  const response = await api.post("/feedback", { feedback: data });

  return response.data;
}
