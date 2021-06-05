import App from './App.svelte';
import { createServer } from 'miragejs'

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
      '/objectives/1',
      () => objectives[0],
      { timing: 1000 },
    )

    this.patch(
      '/objectives/1',
      (_, request) => {
        const data = JSON.parse(request.requestBody)

        return objectives[0] = { ...objectives[0], ...data }
      },
    )

    this.get(
      '/objectives/2',
      () => objectives[1],
      { timing: 1000 },
    )

    this.get(
      '/objectives/1/practice_sessions',
      () => practiceSessions.filter(practiceSession => practiceSession.objective_id === 1),
      { timing: 1000 },
    )

    this.get(
      '/objectives/2/practice_sessions',
      () => {
        return []
      },
      { timing: 1000 },
    )
  }
})

const app = new App({
	target: document.body,
});

export default app;
