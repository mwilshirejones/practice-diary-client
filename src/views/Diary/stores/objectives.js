import { writable } from 'svelte/store'

function addObjectives(objectives, store) {
  // TODO: Remove duplicates?
  return [...store, ...objectives]
}

function addObjective(objective, store) {
  return [...store, objective]
}

function updateObjective(objective, store) {
  return store.map(obj => {
    if (obj.id !== objective.id) return obj

    return {
      ...objective,
      ...objective
    }
  })
}

function deleteObjective(objectiveId, store) {
  // TODO: Should casting it to a string be necessary?
  return store.filter(obj => obj.id.toString() !== objectiveId)
}

function createObjectivesStore() {
  const { subscribe, update } = writable([])

  return {
    subscribe,
    addItems: objectives => update(store => addObjectives(objectives, store)),
    addItem: objective => update(store => addObjective(objective, store)),
    updateItem: objective => update(store => updateObjective(objective, store)),
    deleteItem: objectiveId => update(store => deleteObjective(objectiveId, store)),
  }
}

export const objectives = createObjectivesStore()
