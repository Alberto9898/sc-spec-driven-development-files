import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { raw } from 'hono/html'

const app = new Hono()

app.get('/', (c) =>
  c.html(
    <>
      {raw('<!DOCTYPE html>')}
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>AgentClinic</title>
        </head>
        <body>
          <h1>Welcome to AgentClinic</h1>
          <p>Where overworked AI agents come to recover from their humans.</p>
        </body>
      </html>
    </>
  )
)

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`AgentClinic running at http://localhost:${info.port}`)
})
