<script>
  import isEmpty from 'lodash/isEmpty'

  import { Link } from '../../../../components/Router'

  import { fetchPracticeSessions as fetchPracticeSessionsRequest } from '../../api/practice-sessions'
  import { deleteObjective as deleteObjectiveRequest } from '../../api/objectives'
  import { objectives } from '../../stores/objectives'

  import Resource from '../Resource'

  import ObjectiveForm from './ObjectiveForm'
  import ObjectiveView from './ObjectiveView'

  export let location = ''
  export let isLoadingObjectives = true
  let practiceSessions = []
  let isLoadingPracticeSessions = true

  async function deleteObjective(id) {
    await deleteObjectiveRequest(id)
    objectives.deleteItem(id)
  }

  async function fetchPracticeSessions(id) {
    practiceSessions = await fetchPracticeSessionsRequest(id)
    isLoadingPracticeSessions = false
  }

  $: {
    practiceSessions = []
    isLoadingPracticeSessions = true
  }
</script>

<article class="objective">
  <Resource
    resources={$objectives}
    location={location}
    isLoading={isLoadingObjectives}
    resourceName="objective"
    onDeleteResource={id => deleteObjective(id)}
    onResourceLoaded={id => fetchPracticeSessions(id)}
  >
    <p slot="loading">Loading objective...</p>
    <p slot="deleted">Objective successfully deleted!</p>

    <span slot="form" let:resource={resource} let:toggleEdit={toggleEdit}>
      <ObjectiveForm objective={resource} toggleEdit={toggleEdit} />
    </span>

    <span slot="view" let:resource={resource}>
      <ObjectiveView name={resource.name} />
    </span> 

    <span slot="footer">
      <!-- FIXME: Show loading when switching objectives without reload. -->
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
    </span>
  </Resource>
</article>
