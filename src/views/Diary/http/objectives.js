import { buildEndpoint } from '../helpers/http'

const OBJECTIVES_ENDPOINT = buildEndpoint('objectives')
const OBJECTIVE_ENDPOINT = id => `${OBJECTIVES_ENDPOINT}/${id}`

export async function fetchObjectives() {
  const response = await fetch(OBJECTIVES_ENDPOINT)

  if (!response.ok) throw new Error(response.status)

  const objectives = await response.json()
  return objectives
}

export async function fetchObjective(objectiveId) {
  const response = await fetch(OBJECTIVE_ENDPOINT(objectiveId))

  if (!response.ok) throw new Error(response.status)

  const objective = await response.json()
  return objective
}

export async function postObjective(data) {
  const response = await fetch(
    OBJECTIVES_ENDPOINT(),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )

  if (!response.ok) throw new Error(response.status)

  const objective = await response.json()
  return objective
}

export async function patchObjective(objectiveId, data) {
  const response = await fetch(
    OBJECTIVE_ENDPOINT(objectiveId),
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )

  if (!response.ok) throw new Error(response.status)

  const objective = await response.json()
  return objective
}

export async function deleteObjective(objectiveId) {
  const response = await fetch(
    OBJECTIVE_ENDPOINT(objectiveId),
    { method: 'DELETE' }
  )

  if (!response.ok) throw new Error(response.status)

  const objective = await response.json()
  return objective
}
