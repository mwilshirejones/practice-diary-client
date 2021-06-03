<script>
  import { Link } from '../../../../components/Router'
  import { getUrlParams } from '../../../../components/Router/helpers.js'

  import { fetchObjective } from '../../http/objectives'
  import { fetchPracticeSessions } from '../../http/practice-sessions'

  import ObjectiveForm from '../ObjectiveForm'

  export let location = ''
  let id = null
  let objective = {}
  let loadingObjective = true
  let practiceSessions = []
  let loadingPracticeSessions = true
  let isEditing = false

  function toggleEdit() {
    isEditing = !isEditing
  }

  function setId(loc) {
    // TODO: Use named params somehow, e.g. /objective/:id
    const urlParams = getUrlParams(loc)
    const lastParam = urlParams[urlParams.length - 1]

    if (lastParam === 'objective') {
      id = null
      return
    }

    id = lastParam
  }

  $: {
    setId(location)

    objective = {}
    loadingObjective = true

    practiceSessions = []
    loadingPracticeSessions = true
  }

  $: if (id) (async () => {
    objective = await fetchObjective(id)
    loadingObjective = false

    practiceSessions = await fetchPracticeSessions(id)
    loadingPracticeSessions = false
  })()
</script>

<article>
  {#if id}
    {#if loadingObjective}
      <p>Loading objective...</p>
    {:else if isEditing}
      <ObjectiveForm objective={objective} toggleEdit={toggleEdit} />
    {:else}
      <h1>{objective.name}</h1> 
      <button on:click={toggleEdit} type="button">Edit objective</button>

      {#if loadingPracticeSessions}
        <p>Loading practice sessions...</p>
      {:else}
        <ol>
          {#each practiceSessions as practiceSession (practiceSession.id)}
            <li><Link href={`/diary/practice-session/${practiceSession.id}`}>{practiceSession.name}</Link></li>
          {/each}
        </ol>
      {/if}
    {/if}

    <Link href="/diary/practice-session">Create a new practice session</Link>
  {:else}
    <ObjectiveForm />
  {/if}
</article>

<style>
</style>
