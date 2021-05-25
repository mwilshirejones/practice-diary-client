<script>
  import { onMount } from 'svelte'
  import { location } from './store.js'

  export let href = ''
  let pathname = ''

  const handleClick = () => {
    location.update(loc => loc = pathname)
    window.history.pushState({}, null, pathname)
  }

  onMount(() => {
    if ($location === '/') {
      pathname = `${$location}${href}`
      return
    }

    let appendToDomainRoot = href.indexOf('/') === 0
    pathname = appendToDomainRoot ? href : `${$location}/${href}`
  })
</script>

<a href={pathname} on:click|preventDefault={handleClick}><slot></slot></a>
