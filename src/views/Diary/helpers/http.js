export const buildEndpoint = resource => {
  let endpoint = `/api/${resource}`
  if (env.NODE_ENV === 'development' && !env.MOCK_REQ) endpoint = `http://localhost:3000${endpoint}`
  return endpoint
}
