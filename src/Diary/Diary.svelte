<script>
  import { onMount } from 'svelte'

  let objectives = []
  let loading = true

  onMount(async () => {
    const response = await fetch('api/objectives')

    if (!response.ok) throw new Error(response.status)

    objectives = await response.json()
    loading = false
  })
</script>

<main>
  <h1>Diary</h1>

  {#if loading}
    <p>Loading objectives...</p>
  {:else}
    <ul>
      {#each objectives as objective (objective.id)}
        <li>{objective.name}</li>  
      {/each}
    </ul>
  {/if}
</main>

<style>
</style>

