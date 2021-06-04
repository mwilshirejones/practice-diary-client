<script>
  import { Link } from '../../../../components/Router'
  import { objectives } from '../../stores/objectives'
</script>

<nav>
  {#if $objectives.length}
    <ul>
      {#each $objectives as objective (objective.id)}
        <li><Link href={`/diary/objective/${objective.id}`}>{objective.name}</Link></li>  
      {/each}
    </ul>
  {/if}

  <Link href="/diary/objective">Create a new objective</Link>
</nav>


<style>
</style>
