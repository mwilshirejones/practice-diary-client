<script>
  import { onMount } from 'svelte'
  import { Link } from '../../../../components/Router'
  import { fetchObjectives } from '../../http/objectives'

  let objectives = []
  let loading = true

  onMount(async () => {
    objectives = await fetchObjectives()
    loading = false
  })
</script>

{#if loading}
  <p>Loading objectives...</p>
{:else}
  <nav>
    <ul>
      {#each objectives as objective (objective.id)}
        <li><Link href={`/diary/objective/${objective.id}`}>{objective.name}</Link></li>  
      {/each}
    </ul>

    <Link href="/diary/objective">Create a new objective</Link>
  </nav>
{/if}


<style>
</style>
