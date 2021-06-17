import * as http from '../services/http'
import { buildEndpoint } from '../services/http/helpers'

const OBJECTIVES_ENDPOINT = buildEndpoint('objectives')
const OBJECTIVE_ENDPOINT = id => `${OBJECTIVES_ENDPOINT}/${id}`

export const fetchObjectives = async () => {
  return await http.get(OBJECTIVES_ENDPOINT)
}

export const fetchObjective = async (id) => {
  return await http.get(OBJECTIVE_ENDPOINT(id))
}

export const postObjective = async (data) => {
  return await http.post(OBJECTIVES_ENDPOINT, data)
}

export const patchObjective = async (id, data) => {
  return await http.patch(OBJECTIVE_ENDPOINT(id), data)
}

export const deleteObjective = async (id) => {
  return await http.destroy(OBJECTIVE_ENDPOINT(id))
}
