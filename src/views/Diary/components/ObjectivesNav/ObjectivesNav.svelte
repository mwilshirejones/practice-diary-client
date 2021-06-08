<script>
  import { Link } from '../../../../components/Router'
  import { objectives } from '../../stores/objectives'
</script>

<nav>
  <h2>Objectives</h2>

  <!-- TODO: Skeleton -->
  {#if $objectives.length}
    <ol>
      {#each $objectives as objective (objective.id)}
        <li><Link href={`/diary/objective/${objective.id}`}>{objective.name}</Link></li>  
      {/each}
    </ol>
  {/if}

  <Link href="/diary/objective">Create a new objective</Link>
</nav>

<style>
</style>
