import './css/style.css'
import './css/responsive.css'
import './css/animation.css'
import { initInteractions } from './js/interactions.js'
import { initAnimations } from './js/animations.js'

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

initInteractions()

let animations = null

if (!prefersReducedMotion) {
  animations = initAnimations()
  window.addEventListener('kamcur:layout', () => animations.refresh())
}

function runLoader() {
  const loader = document.getElementById('loader')
  const fill = document.getElementById('loaderFill')
  if (!loader) return Promise.resolve()

  let progress = 0
  let done = false

  const tick = window.setInterval(() => {
    progress = Math.min(progress + 8 + Math.random() * 12, 92)
    if (fill) fill.style.transform = `scaleX(${progress / 100})`
  }, 120)

  return new Promise((resolve) => {
    const finish = () => {
      if (done) return
      done = true
      window.clearInterval(tick)
      if (fill) fill.style.transform = 'scaleX(1)'
      window.setTimeout(() => {
        loader.classList.add('is-done')
        document.body.classList.add('is-loaded')
        resolve()
      }, 260)
    }

    const start = () => window.setTimeout(finish, prefersReducedMotion ? 120 : 520)

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start, { once: true })
    } else {
      start()
    }

    window.setTimeout(finish, 1400)
  })
}

const ready = runLoader()
ready.then(() => animations?.playIntro())
