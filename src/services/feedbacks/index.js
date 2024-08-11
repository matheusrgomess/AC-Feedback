import { api } from "../../api";

export async function getAddedFeedbacks(participantName, questionSetId, reviewedParticipantName, limit) {
  const response = await api.get("/list-added-feedbacks", {
    params: {
      participantName: participantName,
      limit,
      questionSetId: questionSetId,
      reviewedParticipantName: reviewedParticipantName
    },
  });
  return response.data;
}

export async function getReceivedFeedbacks(participantName, questionSetId, limit) {
  const response = await api.get("/list-received-feedbacks", {
    params: {
      participantName: participantName,
      limit,
      questionSetId: questionSetId,
    },
  });
  return response.data;
}

export async function postFeedback(data) {
  const response = await api.post("/feedback", { feedback: data });

  return response.data;
}
