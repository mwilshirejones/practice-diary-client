<script>
  // TODO: get id from URL
  let id
</script>

<article>
  {#if id}
    ...fetching objective {id}
  {:else}
    Create a new objective!
  {/if}
</article>

<style>
</style>
