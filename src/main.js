import App from './App.svelte';
import { createServer } from 'miragejs'

createServer({
  routes() {
    this.namespace = 'api'

    this.get(
      '/objectives',
      () => {
        return [
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
      },
      // Slower server response
      { timing: 1000 },
    )

    this.get(
      '/objectives/1/practice_sessions',
      () => {
        return [
          { id: 1, name: 'Practice session 1', issues: [] },
          { id: 2, name: 'Practice session 2', issues: [] },
        ]
      },
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
