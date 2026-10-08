import { describe, expect, it } from 'vitest'
import { app } from '../src/app.js'

describe('GET /', () => {
  it('returns an HTML page', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('text/html; charset=UTF-8')
  })

  it('renders a complete HTML document', async () => {
    const html = await (await app.request('/')).text()
    expect(html.startsWith('<!DOCTYPE html>')).toBe(true)
    expect(html).toContain('<html lang="en">')
    expect(html).toContain('<meta charset="utf-8"/>')
    expect(html).toContain('<meta name="viewport" content="width=device-width, initial-scale=1"/>')
    expect(html).toContain('<title>AgentClinic</title>')
    expect(html).toContain('<link rel="stylesheet" href="/static/styles.css"/>')
  })

  it('renders header, main and footer in order', async () => {
    const html = await (await app.request('/')).text()
    const header = html.indexOf('<header class="site-header">')
    const main = html.indexOf('<main class="site-main">')
    const footer = html.indexOf('<footer class="site-footer">')
    expect(header).toBeGreaterThan(-1)
    expect(main).toBeGreaterThan(header)
    expect(footer).toBeGreaterThan(main)
  })

  it('shows the welcome title and tagline inside main', async () => {
    const html = await (await app.request('/')).text()
    const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'))
    expect(main).toContain('<h1>Welcome to AgentClinic</h1>')
    expect(main).toMatch(/<p>[^<]+<\/p>/)
  })
})

describe('static files', () => {
  it('serves the stylesheet as CSS', async () => {
    const res = await app.request('/static/styles.css')
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toMatch(/^text\/css/)
  })

  it('returns 404 for a missing static file', async () => {
    const res = await app.request('/static/nope.css')
    expect(res.status).toBe(404)
  })
})

describe('unknown routes', () => {
  it('returns 404', async () => {
    const res = await app.request('/nope')
    expect(res.status).toBe(404)
  })
})
