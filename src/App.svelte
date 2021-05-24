<script>
  import Diary from './views/Diary'
  import Login from './views/Login'

  /* TODO: Move routing to a component */
  let location = window.location.pathname

  let setLocation = loc => location = loc
    
  let goTo = loc => {
    location = loc
    window.history.pushState({}, null, location)
  }
</script>

<svelte:window on:popstate={() => setLocation(window.location.pathname)} />

<!-- TODO: Replace with log in -->
{#if location === '/'}
  <Login />
{:else if location.includes('/diary')}
  <Diary />
{/if}
