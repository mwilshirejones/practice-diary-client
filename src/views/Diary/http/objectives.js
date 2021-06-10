let objectivesEndpoint = '/api/objectives'
if (env.NODE_ENV === 'development' && !env.MOCK_REQ) objectivesEndpoint = `http://localhost:3000${objectivesEndpoint}`

const objectiveEndpoint = id => `${objectivesEndpoint}/${id}`

export async function fetchObjectives() {
  const response = await fetch(objectivesEndpoint)

  if (!response.ok) throw new Error(response.status)

  const objectives = await response.json()
  return objectives
}

export async function fetchObjective(objectiveId) {
  const response = await fetch(objectiveEndpoint(objectiveId))

  if (!response.ok) throw new Error(response.status)

  const objective = await response.json()
  return objective
}

export async function postObjective(data) {
  const response = await fetch(
    objectivesEndpoint,
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
    objectiveEndpoint(objectiveId),
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
