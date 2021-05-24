<script>
  import { location } from './store.js'

  export let href = ''

  let pathname = ''

  const handleClick = () => {
    location.update(loc => loc = pathname)
    window.history.pushState({}, null, href)
  }

  $: pathname = `${$location}${href}`
</script>

<a href={pathname} on:click|preventDefault={handleClick}><slot></slot></a>
