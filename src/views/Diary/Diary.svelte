<script>
  import { onMount } from 'svelte'

  import { Route } from '../../components/Router'

  import Objective from './components/Objective'
  import ObjectivesNav from './components/ObjectivesNav'
  import PracticeSession from './components/PracticeSession'

  import { fetchObjectives } from './http/objectives'
  import { objectives } from './stores/objectives'

  let loadingObjectives = true

  onMount(async () => {
    const response = await fetchObjectives()
    objectives.addItems(response)
    loadingObjectives = false
  })
</script>

<main>
  <Route match="/diary">
    <h1>My practice diary</h1>
    <p>Inspiring quote lol</p>
  </Route>

  {#if loadingObjectives}
    <p>Loading objectives...</p>
  {:else}
    <Route contains="/diary/objective" let:location={location}>
      <Objective location={location} />
    </Route>

    <Route contains="/diary/practice-session" let:location={location}>
      <PracticeSession location={location} />
    </Route>

    <ObjectivesNav />
  {/if}
</main>

<style>
</style>

