<script>
  export let objective = null
  export let toggleEdit = null
</script>

{#if objective}
  <h1>Edit {objective.name}</h1>
  <button on:click={toggleEdit} type="button">Cancel</button>
{:else}
  <h1>Create a new objective</h1>
{/if}

<style>
</style>
