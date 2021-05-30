<script>
  import { Route } from '../../components/Router'

  import Objective from './components/Objective'
  import ObjectivesNav from './components/ObjectivesNav'
  import PracticeSession from './components/PracticeSession'
</script>

<main>
  <Route match="/diary">
    <h1>My practice diary</h1>
    <p>Inspiring quote lol</p>
  </Route>

  <Route contains="/diary/objective" let:location={location}>
    <Objective location={location} />
  </Route>

  <Route contains="/diary/practice-session" let:location={location}>
    <PracticeSession location={location} />
  </Route>

  <ObjectivesNav />
</main>

<style>
</style>

