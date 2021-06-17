export async function get(endpoint) {
  const response = await fetch(endpoint)

  if (!response.ok) throw new Error(response.status)

  return await response.json()
}

export async function post(endpoint, data) {
  const response = await fetch(
    endpoint,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  )

  if (!response.ok) throw new Error(response.status)

  return await response.json()
}

export async function patch(endpoint, data) {
  const response = await fetch(
    endpoint,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  )

  if (!response.ok) throw new Error(response.status)

  return await response.json()
}

export async function destroy(endpoint) {
  const response = await fetch(
    endpoint,
    { method: 'DELETE' },
  )

  if (!response.ok) throw new Error(response.status)

  return await response.json()
}
