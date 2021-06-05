<script>
  import isEmpty from 'lodash/isEmpty'

  import { patchObjective, postObjective } from '../../http/objectives'
  import { objectives } from '../../stores/objectives'

  export let objective = {}
  export let toggleEdit = null

  let saving = false
  let isNew = false
  let onSubmit = null
  let values = { ...objective }

  async function updateObjective({ target: form }) {
    const { id, ...restValues } = values

    saving = true

    const response = await patchObjective(id, restValues)
    objectives.updateItem(response)

    saving = false
    toggleEdit()
  }

  async function createObjective({ target: form }) {
    saving = true

    const response = await postObjective(values)
    objectives.addItem(response)

    saving = false
    toggleEdit()
  }

  $: onSubmit = isNew ? createObjective : updateObjective
  $: isNew = isEmpty(objective)
</script>

{#if isNew}
  <h1>Create a new objective</h1>
{:else}
  <h1>Edit objective</h1>
{/if}

<form on:submit|preventDefault={onSubmit}>
  <input type="text" name="name" bind:value={values.name} />

  <button type="submit">{ saving ? 'Saving...' : 'Save objective' }</button>
</form>

{#if !isNew}
  <button on:click={toggleEdit} type="button">Cancel</button>
{/if}

<style>
</style>
