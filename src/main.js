import App from './App.svelte';
import { createServer } from 'miragejs'

createServer({
  routes() {
    this.namespace = 'api'

    this.get(
      '/objectives',
      () => {
        return {
          objectives: [
            { id: 1, name: 'Objective 1' },
            { id: 2, name: 'Objective 2' },
          ]
        }
      },
      // Slower server response
      { timing: 4000 }
    )
  }
})

const app = new App({
	target: document.body,
});

export default app;
