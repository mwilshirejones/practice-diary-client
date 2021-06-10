import App from './App.svelte';
import { createServer } from 'miragejs'

if (env.NODE_ENV === 'development' && env.MOCK_REQ) {
  createServer({
    routes() {
      const objectives = [
        { 
          id: 1, 
          name: 'Objective 1', 
          practice_sessions: [
            { id: 1, name: 'Practice session 1' },
            { id: 2, name: 'Practice session 2' },
          ],
        },
        { id: 2, name: 'Objective 2', practice_sessions: [] },
      ]

      const practiceSessions = [
        { id: 1, name: 'Practice session 1', issues: [], objective_id: 1 },
        { id: 2, name: 'Practice session 2', issues: [], objective_id: 1 },
      ]

      this.namespace = 'api'

      this.get(
        '/objectives',
        () => objectives,
        // Slower server response
        { timing: 1000 },
      )

      this.post(
        '/objectives',
        (_, request) => {
          const data = JSON.parse(request.requestBody)

          const lastId = objectives[objectives.length - 1].id
          objectives.push({
            ...data,
            id: lastId + 1,
          })

          return objectives[objectives.length - 1]
        },
      )

      this.get(
        '/objectives/:id',
        (_, request) => {
          const objectiveIndex = objectives.map(o => o.id.toString()).indexOf(request.params.id)

          return objectives[objectiveIndex]
        },
        { timing: 1000 },
      )

      this.patch(
        '/objectives/:id',
        (_, request) => {
          const data = JSON.parse(request.requestBody)
          // TODO: Use Miragejs "schemas" — I think it will make all this a little simpler?
          const objectiveIndex = objectives.map(o => o.id.toString()).indexOf(request.params.id)

          return objectives[objectiveIndex] = { ...objectives[objectiveIndex], ...data }
        },
      )

      this.delete(
        '/objectives/:id',
        (_, request) => {
          const objectiveIndex = objectives.map(o => o.id.toString()).indexOf(request.params.id)

          objectives.splice(objectiveIndex)

          return {}
        },
      )

      // TODO: Update to use dynamic segment for `:id`
      this.get(
        '/objectives/1/practice_sessions',
        () => practiceSessions.filter(practiceSession => practiceSession.objective_id === 1),
        { timing: 1000 },
      )

      // TODO: Update to use dynamic segment for `:id`
      this.get(
        '/objectives/2/practice_sessions',
        () => {
          return []
        },
        { timing: 1000 },
      )
    }
  })
}

const app = new App({
	target: document.body,
});

export default app;
