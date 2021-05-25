<script>
  import { Route } from '../../components/Router'

  import Objective from './components/Objective'
  import ObjectivesNav from './components/ObjectivesNav'
  import PracticeSession from './components/PracticeSession'
</script>

<main>
  <h1>My practice diary</h1>

  <ObjectivesNav />

  <Route match="/diary">Inspiring quote lol</Route>
  <Route contains="/diary/objective"><Objective /></Route>
  <Route contains="/diary/practice-session"><PracticeSession /></Route>
</main>

<style>
</style>

