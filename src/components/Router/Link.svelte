<script>
  import { onMount } from 'svelte'
  import { location } from './store'
  import { goTo } from './helpers'

  export let href = ''
  let pathname = ''

  onMount(() => {
    if ($location === '/') {
      pathname = `${$location}${href}`
      return
    }

    let appendToDomainRoot = href.indexOf('/') === 0
    pathname = appendToDomainRoot ? href : `${$location}/${href}`
  })
</script>

<a href={pathname} on:click|preventDefault={() => goTo(pathname)}><slot></slot></a>
