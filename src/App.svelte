<script>
  import Diary from './Diary/Diary.svelte'

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
  <main>
    <h1>Practice Diary</h1>

    <p>Go to <a href="/diary" on:click|preventDefault={() => goTo('/diary')}>your diary</a>.</p>
  </main>
{:else if location === '/diary'}
  <Diary />
{/if}

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
