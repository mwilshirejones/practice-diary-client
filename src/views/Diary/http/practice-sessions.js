export async function fetchPracticeSessions(objectiveId) {
  const response = await fetch(`/api/objectives/${objectiveId}/practice_sessions`)

  if (!response.ok) throw new Error(response.status)

  const practiceSessions = await response.json()
  return practiceSessions
}
