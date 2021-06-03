export async function fetchObjectives() {
  const response = await fetch('/api/objectives')

  if (!response.ok) throw new Error(response.status)

  const objectives = await response.json()
  return objectives
}

export async function fetchObjective(objectiveId) {
  const response = await fetch(`/api/objectives/${objectiveId}`)

  if (!response.ok) throw new Error(response.status)

  const objective = await response.json()
  return objective
}

export async function patchObjective(objectiveId, data) {
  const response = await fetch(
    `/api/objectives/${objectiveId}`,
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
