<script>
  import { getUrlParams } from '../../../../components/Router/helpers.js'

  export let location = ''
  let id = null

  $: {
    // FIXME: Use named params somehow, e.g. /objective/:id
    //        or pass id down from parent 
    let urlParams = getUrlParams(location)
    id = urlParams[urlParams.length - 1]
  }
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
