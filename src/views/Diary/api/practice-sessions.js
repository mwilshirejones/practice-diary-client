import { buildEndpoint } from '../services/http/helpers'

const OBJECTIVES_ENDPOINT = buildEndpoint('objectives')
const PRACTICE_SESSIONS_ENDPOINT = objectiveId => (
  `${OBJECTIVES_ENDPOINT}/${objectiveId}/practice_sessions`
)

export async function fetchPracticeSessions(objectiveId) {
  const response = await fetch(PRACTICE_SESSIONS_ENDPOINT(objectiveId))

  if (!response.ok) throw new Error(response.status)

  const practiceSessions = await response.json()
  return practiceSessions
}
