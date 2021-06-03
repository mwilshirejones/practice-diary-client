<script>
  import { patchObjective } from '../../http/objectives'

  export let objective = null
  export let toggleEdit = null

  let values = { ...objective }
  values.isChecked = false

  async function onSubmit({ target: form }) {
    // FIXME: Don't want all the values if patching...
    //        Only get values from the form...
    const { id, ...restValues } = values

    const response = await patchObjective(id, restValues)
    console.log({ response })

    // TODO: Update objective store

    // objective = await response.json()
    // loadingObjective = false
  }
</script>

{#if objective}
  <h1>Edit objective</h1>

  <form on:submit|preventDefault={onSubmit}>
    <input type="text" name="name" bind:value={values.name} />
    <input type="checkbox" name="isChecked" bind:checked={values.isChecked} />

    <button type="submit">Save objective</button>
  </form>

  <button on:click={toggleEdit} type="button">Cancel</button>
{:else}
  <h1>Create a new objective</h1>
{/if}

<style>
</style>
