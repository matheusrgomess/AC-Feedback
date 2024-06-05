export function formatUserFeedbacks(avaliations, user) {
  return avaliations.filter(avaliation => avaliation.reviewed === user);
}

export function formatUserFeedbacksCreated(avaliations, user) {
  return avaliations.filter(avaliations => avaliations.reviewer === user);
}