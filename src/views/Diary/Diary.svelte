<script>
  import { onMount } from 'svelte'

  import { Route } from '../../components/Router'

  import Objective from './components/Objective'
  import ObjectivesNav from './components/ObjectivesNav'
  import PracticeSession from './components/PracticeSession'
  import Welcome from './components/Welcome'

  import { fetchObjectives } from './http/objectives'
  import { objectives } from './stores/objectives'

  let isLoadingObjectives = true

  onMount(async () => {
    const response = await fetchObjectives()
    objectives.addItems(response)
    isLoadingObjectives = false
  })
</script>

<main>
  <ObjectivesNav class="sidebar" />

  <Route match="/diary">
    <Welcome />
  </Route>

  <Route contains="/diary/objective" let:location={location}>
    <Objective location={location} isLoadingObjectives={isLoadingObjectives} />
  </Route>

  <Route contains="/diary/practice-session" let:location={location}>
    <PracticeSession location={location} />
  </Route>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: var(--space-md);
  }
</style>

