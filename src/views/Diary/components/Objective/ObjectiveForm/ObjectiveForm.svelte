<script>
  import isEmpty from 'lodash/isEmpty'

  import { patchObjective, postObjective } from '../../../api/objectives'
  import { objectives } from '../../../stores/objectives'

  export let objective = {}
  export let toggleEdit = null

  let saving = false
  let isNew = false
  let onSubmit = null
  let values = { ...objective }

  async function updateObjective() {
    const { id, ...restValues } = values

    saving = true

    const response = await patchObjective(id, restValues)
    objectives.updateItem(response)

    saving = false
    toggleEdit()
  }

  async function createObjective() {
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
{/if}

<form on:submit|preventDefault={onSubmit}>
  <input class="field" type="text" name="name" bind:value={values.name} />

  <div>
    <button type="submit">{ saving ? 'Saving...' : 'Save' }</button>

    {#if !isNew}
      <button on:click={toggleEdit} type="button">Cancel</button>
    {/if}
  </div>
</form>

<style>
  .field {
    margin-bottom: var(--space-xs);
  }
</style>
