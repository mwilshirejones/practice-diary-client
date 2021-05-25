<script>
  // TODO: get id from URL
  let id
</script>

<article>
  {#if id}
    ...fetching practice session {id}
  {:else}
    Create a new practice session!
  {/if}
</article>

<style>
</style>
