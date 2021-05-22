<script>
  /* TODO: Move routing to a component */
  let location = window.location.pathname

  let setLocation = loc => location = loc
    
  let goTo = loc => {
    location = loc
    window.history.pushState({}, null, location)
  }
</script>

<svelte:window on:popstate={() => setLocation(window.location.pathname)} />

<main>
	<h1>My Practice Diary</h1>

  <!-- TODO: Replace with log in -->
  {#if location === '/'}
    <p>Go to my <a href="/objectives" on:click|preventDefault={() => goTo('/objectives')}>objectives</a>.</p>
  {:else if location === '/objectives'}
    <p>Hello</p>
  {/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
