/** @jsxImportSource hono/jsx */
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { Child } from 'hono/jsx'
import { Header } from '../src/components/Header.js'
import { Main } from '../src/components/Main.js'
import { Footer } from '../src/components/Footer.js'
import { Layout } from '../src/components/Layout.js'

const render = async (node: Child) => String(await node?.toString())

describe('Header', () => {
  it('renders the brand as a link to the home page', async () => {
    const html = await render(<Header />)
    expect(html).toBe(
      '<header class="site-header"><a class="site-header__brand" href="/">AgentClinic</a></header>'
    )
  })
})

describe('Main', () => {
  it('wraps its children in the main landmark', async () => {
    const html = await render(
      <Main>
        <p>content</p>
      </Main>
    )
    expect(html).toBe('<main class="site-main"><p>content</p></main>')
  })

  it('renders an empty main without children', async () => {
    expect(await render(<Main />)).toBe('<main class="site-main"></main>')
  })
})

describe('Footer', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows the copyright with the current year', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2031-05-01T12:00:00Z'))
    const html = await render(<Footer />)
    expect(html).toBe('<footer class="site-footer"><p>© 2031 AgentClinic</p></footer>')
  })
})

describe('Layout', () => {
  const page = () =>
    render(
      <Layout title="Test page">
        <h1>Hello</h1>
      </Layout>
    )

  it('starts with a single doctype', async () => {
    const html = await page()
    expect(html.startsWith('<!DOCTYPE html>')).toBe(true)
    expect(html.match(/<!DOCTYPE html>/g)).toHaveLength(1)
  })

  it('uses the title prop for the document title', async () => {
    expect(await page()).toContain('<title>Test page</title>')
  })

  it('escapes the title', async () => {
    const html = await render(<Layout title={'<script>x</script>'}>body</Layout>)
    expect(html).toContain('<title>&lt;script&gt;x&lt;/script&gt;</title>')
    expect(html).not.toContain('<script>')
  })

  it('sets a responsive viewport that allows zooming', async () => {
    const html = await page()
    const viewport = html.match(/<meta name="viewport" content="([^"]*)"\/>/)
    expect(viewport?.[1]).toBe('width=device-width, initial-scale=1')
    expect(html).not.toMatch(/user-scalable|maximum-scale/)
  })

  it('links the stylesheet in the head', async () => {
    const html = await page()
    const head = html.slice(html.indexOf('<head>'), html.indexOf('</head>'))
    expect(head).toContain('<link rel="stylesheet" href="/static/styles.css"/>')
  })

  it('composes header, main with the children, and footer in the body', async () => {
    const html = await page()
    const body = html.slice(html.indexOf('<body>') + '<body>'.length, html.indexOf('</body>'))
    expect(body.startsWith('<header class="site-header">')).toBe(true)
    expect(body).toContain('<main class="site-main"><h1>Hello</h1></main>')
    expect(body.endsWith('</footer>')).toBe(true)
  })
})
