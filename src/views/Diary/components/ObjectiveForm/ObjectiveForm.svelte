<script>
  import { patchObjective } from '../../http/objectives'
  import { objectives } from '../../stores/objectives'

  export let objective = null
  export let toggleEdit = null

  let saving = false
  let values = { ...objective }

  async function onSubmit({ target: form }) {
    // FIXME: Don't want all the values if patching...
    //        Only get values from the form...
    // TODO: Determine if post or patch
    const { id, ...restValues } = values

    saving = true

    const response = await patchObjective(id, restValues)
    objectives.updateItem(response)

    saving = false
    toggleEdit()
  }
</script>

{#if objective}
  <h1>Edit objective</h1>

  <form on:submit|preventDefault={onSubmit}>
    <input type="text" name="name" bind:value={values.name} />

    <button type="submit">{ saving ? 'Saving...' : 'Save objective' }</button>
  </form>

  <button on:click={toggleEdit} type="button">Cancel</button>
{:else}
  <h1>Create a new objective</h1>
{/if}

<style>
</style>
