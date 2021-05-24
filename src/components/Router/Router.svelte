<script>
  import { onMount } from 'svelte'
  import { location } from './store.js'

  const setLocation = () => {
    location.update(loc => loc = window.location.pathname)
  }

  onMount(() => {
    setLocation()
  })
</script>

<!-- e.g. browser back -->
<svelte:window on:popstate={() => setLocation()} />

<slot></slot>
