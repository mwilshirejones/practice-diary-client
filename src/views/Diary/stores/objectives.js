import { writable } from 'svelte/store'

function addObjectives(objectives, store) {
  // TODO: Remove duplicates?
  return [...store, ...objectives]
}

function addObjective(objective, objectives) {
  return [...objectives, objective]
}

function updateObjective(objective, objectives) {
  return objectives.map(obj => {
    if (obj.id !== objective.id) return obj

    return {
      ...objective,
      ...objective
    }
  })
}

function createObjectivesStore() {
  const { subscribe, update } = writable([])

  return {
    subscribe,
    addItems: objectives => update(store => addObjectives(objectives, store)),
    addItem: objective => update(store => addObjective(objective, store)),
    updateItem: objective => update(store => updateObjective(objective, store)),
    // deleteItem: () => update(deleteObjective),
  }
}

export const objectives = createObjectivesStore()
