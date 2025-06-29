const inject_style_and_repaint = (): void => {
  const href =
    browser.runtime.getURL('assets/injection.css') + `?t=${Date.now()}`

  const prev = document.querySelector('link[data-extension-style]')
  if (prev) prev.remove()

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.dataset.extensionStyle = href

  const parent = document.head ?? document.documentElement
  parent.appendChild(link)
}

export default defineContentScript({
  matches: ['*://*.google.com/*'],
  cssInjectionMode: 'manual',
  runAt: 'document_start',
  main() {
    if (
      document.head ||
      document.readyState === 'complete' ||
      document.readyState === 'interactive'
    ) {
      inject_style_and_repaint()
    } else {
      window.addEventListener('DOMContentLoaded', inject_style_and_repaint, {
        once: true,
      })
    }
  },
})
