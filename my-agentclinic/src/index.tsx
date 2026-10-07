import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { Layout } from './components/Layout.js'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

app.get('/', (c) =>
  c.html(
    <Layout title="AgentClinic">
      <h1>Welcome to AgentClinic</h1>
      <p>Where overworked AI agents come to recover from their humans.</p>
    </Layout>
  )
)

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`AgentClinic running at http://localhost:${info.port}`)
})
