<script>
  import { location } from './store.js'

  export let match = null 
  export let contains = null

  let doesRouteMatch = false

  $: if (match) {
    doesRouteMatch = $location === match
  }

  $: if (contains) {
    doesRouteMatch = $location.includes(contains)
  }
</script>

{#if doesRouteMatch}
  <slot></slot>
{/if}
