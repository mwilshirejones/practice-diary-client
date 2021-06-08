<script>
  import Diary from './views/Diary'
  import Login from './views/Login'
  import { Router, Route } from './components/Router'
</script>

<Router>
  <Route match='/'><Login /></Route>
  <Route contains='/diary'><Diary /></Route>
</Router>

<style global>
  /* Design tokens */
  :root {
    /* Typography */
    --font_size__ratio: 1.125; /* major second */
    --font_size__base: 1rem;
    --font_size__sm: calc(var(--font_size__base) / var(--font_size__ratio));
    --font_size__md: calc(var(--font_size__base) * var(--font_size__ratio));
    --font_size__lg: calc(var(--font_size__md) * var(--font_size__ratio));
    --font_size__xlg: calc(var(--font_size__lg) * var(--font_size__ratio));
    --font_size__xxlg: calc(var(--font_size__xlg) * var(--font_size__ratio));
    --font_size__xxxlg: calc(var(--font_size__xxlg) * var(--font_size__ratio));

    /* Spacing */
    --space-unit: 1em;
    /* Fibonacci sequence */
    --space-xxs: calc(0.25 * var(--space-unit));
    --space-xs: calc(0.5 * var(--space-unit));
    --space-sm: calc(0.75 * var(--space-unit));
    --space-md: calc(1.25 * var(--space-unit));
    --space-lg: calc(2 * var(--space-unit));
    --space-xl: calc(3.25 * var(--space-unit));
    --space-xxl: calc(5.25 * var(--space-unit));
  }

  html { 
    /* Fluid font sizes */
    font-size: calc(1rem + 0.5vw);
  }

  /* Use system fonts */
  body {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    font-size: var(--font_size__base);
  }

  h1 { font-size: var(--font_size__xxxlg); }
  h2 { font-size: var(--font_size__xxlg); }
  h3 { font-size: var(--font_size__xlg); }
  h4 { font-size: var(--font_size__lg); }
  h5 { font-size: var(--font_size__md); }
  h6 { font-size: var(--font_size__sm); }
  small { font-size: var(--font_size__xl); }

  h1, h2, h3, h4, h5, h6, small, p {
    margin: 0 0 var(--space-xs);
  }

  /* Generally don't want any spacing between first element and its parent */
  *:first-child { margin-top: 0; }
</style>
