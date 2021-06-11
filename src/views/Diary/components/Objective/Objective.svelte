<script>
  import isEmpty from 'lodash/isEmpty'

  import { Link } from '../../../../components/Router'
  import { getUrlParams } from '../../../../components/Router/helpers.js'

  import { fetchPracticeSessions } from '../../http/practice-sessions'
  import { deleteObjective as deleteObjectiveRequest } from '../../http/objectives'
  import { objectives } from '../../stores/objectives'

  import ObjectiveForm from '../ObjectiveForm'

  export let location = ''
  export let isLoadingObjectives = true
  let id = null
  let objective = {}
  let practiceSessions = []
  let isLoadingPracticeSessions = true
  let isEditing = false
  let isDeleting = false
  let isDeleted = false

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

  async function deleteObjective() {
    isDeleting = true

    await deleteObjectiveRequest(id)
    objectives.deleteItem(id)

    isDeleting = false
    isDeleted = true
  }

  $: {
    setId(location)

    objective = {}

    practiceSessions = []
    isLoadingPracticeSessions = true
  }

  $: if (id && !isEmpty($objectives)) {
    objective = $objectives.find(obj => obj.id == id) || {}
  }

  $: if (id) (async () => {
    practiceSessions = await fetchPracticeSessions(id)
    isLoadingPracticeSessions = false
  })()
</script>

<article class="objective">
  {#if id}
    {#if isLoadingObjectives}
      <!-- TODO: Skeleton -->
      <p>Loading objective...</p>
    {:else if isDeleted}
      <p>Objective successfully deleted!</p>
    {:else}
      <section> 
        {#if isEditing}
          <ObjectiveForm objective={objective} toggleEdit={toggleEdit} />
        {:else}
          <h1>{objective.name}</h1> 
          <button on:click={toggleEdit} type="button">Edit objective</button>
          <button on:click={deleteObjective} type="button">{isDeleting ? 'Deleting...' : 'Delete objective'}</button>
        {/if}
      </section>

      <section>
        {#if isLoadingPracticeSessions}
          <p>Loading practice sessions...</p>
        {:else}
          <ol>
            {#each practiceSessions as practiceSession (practiceSession.id)}
              <li><Link href={`/diary/practice-session/${practiceSession.id}`}>{practiceSession.name}</Link></li>
            {/each}
          </ol>
        {/if}

        <Link href="/diary/practice-session">Create a new practice session</Link>
      </section>
    {/if}
  {:else}
    <ObjectiveForm />
  {/if}
</article>

<style>
  .objective {
    display: grid;
    grid-gap: var(--space-md);
  }
</style>
