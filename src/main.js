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
          return objectives.find(o => o.id.toString() === request.params.id)
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

      this.get(
        '/objectives/:id/practice_sessions',
        (_, request) => {
          const objectiveId = request.params.id
          return practiceSessions.filter(
            practiceSession => practiceSession.objective_id.toString() === objectiveId
          )
        },
        { timing: 1000 },
      )

      this.get(
        '/practice_sessions/:id',
        (_, request) => {
          return practiceSessions.find(
            practiceSession => practiceSession.id.toString() === request.params.id
          )
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
