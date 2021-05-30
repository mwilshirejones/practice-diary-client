<script>
  import { Link } from '../../../../components/Router'
  import { getUrlParams } from '../../../../components/Router/helpers.js'

  export let location = ''
  let id = null

  function setId(loc) {
    // TODO: Use named params somehow, e.g. /objective/:id
    const urlParams = getUrlParams(loc)
    const lastParam = urlParams[urlParams.length - 1]

    if (lastParam !== 'objective') id = lastParam
  }

  $: setId(location)
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
