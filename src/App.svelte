<script>
  import Diary from './views/Diary'
  import Login from './views/Login'
  import { Router, Route } from './components/Router'
</script>

<Router>
  <Route match='/'><Login /></Route>
  <Route contains='/diary'><Diary /></Route>
</Router>
