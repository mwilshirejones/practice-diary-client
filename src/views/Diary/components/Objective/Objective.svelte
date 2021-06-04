<script>
  import isEmpty from 'lodash/isEmpty'

  import { Link } from '../../../../components/Router'
  import { getUrlParams } from '../../../../components/Router/helpers.js'

  import { fetchPracticeSessions } from '../../http/practice-sessions'
  import { objectives } from '../../stores/objectives'

  import ObjectiveForm from '../ObjectiveForm'

  export let location = ''
  let id = null
  let objective = {}
  let loadingObjective = true
  let practiceSessions = []
  let loadingPracticeSessions = true
  let isEditing = false
  let isNew = false

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

  $: if (id) {
    objective = $objectives.find(obj => obj.id == id) || {}
    loadingObjective = false
  }

  $: if (id) (async () => {
    practiceSessions = await fetchPracticeSessions(id)
    loadingPracticeSessions = false
  })()

  $: isNew = isEmpty(objective)
</script>

<article>
  {#if id}
    {#if loadingObjective}
      <p>Loading objective...</p>
    {:else if isEditing || isNew}
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
