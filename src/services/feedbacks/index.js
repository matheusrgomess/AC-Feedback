import { api } from "../../api";

export async function getFeedbacks(participantName, limit) {
  const response = await api.get("/list-feedbacks", {
    params: {
      participantName: participantName,
      limit,
    },
  });
  return response.data;
}

export async function postFeedback(data) {
  const response = await api.post("/feedback", { feedback: data });

  return response.data;
}
