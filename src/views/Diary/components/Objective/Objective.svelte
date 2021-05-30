<script>
  import { Link } from '../../../../components/Router'
  import { getUrlParams } from '../../../../components/Router/helpers.js'

  let practiceSessions = []
  let loadingPracticeSessions = true

  export let location = ''
  let id = null

  function setId(loc) {
    // TODO: Use named params somehow, e.g. /objective/:id
    const urlParams = getUrlParams(loc)
    const lastParam = urlParams[urlParams.length - 1]

    if (lastParam !== 'objective') id = lastParam
  }

  // TODO: Use async/await svelte templating
  async function fetchPracticeSessions(objectiveId) {
    const response = await fetch(`/api/objectives/${objectiveId}/practice_sessions`)

    if (!response.ok) throw new Error(response.status)

    practiceSessions = await response.json()
    loadingPracticeSessions = false
  }

  $: {
    setId(location)
    practiceSessions = []
    loadingPracticeSessions = true
  }
  $: fetchPracticeSessions(id)
</script>

<article>
  {#if id}
    ...fetching objective {id}

    {#if loadingPracticeSessions}
      <p>Loading practice sessions...</p>
    {:else}
      <ol>
        {#each practiceSessions as practiceSession (practiceSession.id)}
          <li><Link href={`/diary/practice-session/${practiceSession.id}`}>{practiceSession.name}</Link></li>
        {/each}
      </ol>
    {/if}

    <Link href="/diary/practice-session">Create a new practice session</Link>
  {:else}
    Create a new objective!
  {/if}
</article>

<style>
</style>
