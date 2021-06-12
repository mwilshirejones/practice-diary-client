<script>
  import isEmpty from 'lodash/isEmpty'

  import { getUrlParams } from '../../../../components/Router/helpers.js'

  export let location = ''
  export let isLoading = true
  export let resourceName = null // TODO: Validate presence!
  export let resources = []
  export let onResourceLoaded = null
  export let onDeleteResource = null

  let id = null
  let resource = {}
  let isEditing = false
  let isDeleting = false
  let isDeleted = false

  function toggleEdit() {
    isEditing = !isEditing
  }

  function setId(loc) {
    // TODO: Use named params somehow, e.g. /resource/:id
    const urlParams = getUrlParams(loc)
    const lastParam = urlParams[urlParams.length - 1]

    if (lastParam === resourceName) {
      id = null
      return
    }

    id = lastParam
  }

  function resetResource() {
    resource = {}
    isEditing = false
    isDeleting = false
    isDeleted = false
  }

  async function deleteResource() {
    isDeleting = true

    await onDeleteResource(id)

    isDeleting = false
    isDeleted = true
  }

  $: {
    setId(location)
    resetResource()
  }

  $: if (id && !isEmpty(resources)) {
    resource = resources.find(resource => resource.id == id) || {}
  }

  $: if (id && typeof onResourceLoaded === 'function') {
    (async () => {
      await onResourceLoaded(id)
    })()
  }
</script>

<article class="resource">
  {#if id}
    {#if isLoading}
      <slot name="loading" />
    {:else if isDeleted}
      <slot name="deleted" />
    {:else}
      <section> 
        {#if isEditing}
          <slot name="form" resource={resource} toggleEdit={toggleEdit} />
        {:else}
          <slot name="view" resource={resource} />

          <button on:click={toggleEdit} type="button">Edit</button>

          {#if typeof onDeleteResource === 'function'}
            <button on:click={deleteResource} type="button">{isDeleting ? 'Deleting...' : 'Delete'}</button>
          {/if}
        {/if}
      </section>

      <section>
        <slot name="footer" />
      </section>
    {/if}
  {:else}
    <slot name="form" />
  {/if}
</article>

<style>
  .resource {
    display: grid;
    grid-gap: var(--space-md);
  }
</style>
