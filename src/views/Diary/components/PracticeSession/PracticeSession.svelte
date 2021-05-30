<script>
  import { getUrlParams } from '../../../../components/Router/helpers.js'

  export let location = ''
  let id = null

  function setId(loc) {
    // TODO: Use named params somehow, e.g. /objective/:id
    const urlParams = getUrlParams(loc)
    const lastParam = urlParams[urlParams.length - 1]

    if (lastParam !== 'practice-session') id = lastParam
  }

  $: setId(location)
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
