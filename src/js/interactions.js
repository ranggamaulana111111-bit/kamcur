export function initInteractions() {
  const nav = document.getElementById('nav')
  const burger = document.getElementById('navBurger')
  const mobileMenu = document.getElementById('mobileMenu')
  const progressBar = document.getElementById('progressBar')
  const year = document.getElementById('year')

  if (year) year.textContent = String(new Date().getFullYear())

  /* ------------------------------------------------------- motion toggle */
  const motionToggle = document.getElementById('motionToggle')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const storedMotion = (() => {
    try {
      return localStorage.getItem('kamcur:motion')
    } catch {
      return null
    }
  })()
  const startPaused = reducedMotion || storedMotion === 'paused'

  const setMotion = (paused, persist = true) => {
    document.documentElement.dataset.motion = paused ? 'paused' : 'playing'
    motionToggle?.setAttribute('aria-checked', String(!paused))
    if (persist) {
      try {
        localStorage.setItem('kamcur:motion', paused ? 'paused' : 'playing')
      } catch {}
    }
    window.dispatchEvent(new CustomEvent('kamcur:motion', { detail: { paused } }))
  }

  if (reducedMotion) motionToggle?.setAttribute('hidden', '')
  setMotion(startPaused, false)

  motionToggle?.addEventListener('click', () => {
    setMotion(document.documentElement.dataset.motion !== 'paused')
  })

  /* --------------------------------------------------------------- nav */
  const onScroll = () => {
    nav?.classList.toggle('is-scrolled', window.scrollY > 12)

    if (progressBar) {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      progressBar.style.transform = `scaleX(${progress})`
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  /* ------------------------------------------------------- mobile menu */
  const main = document.getElementById('main')
  const footer = document.querySelector('.footer')
  const navLogo = document.querySelector('.nav__logo')
  const navCta = document.querySelector('.nav__cta')
  let lastFocused = null

  if (mobileMenu) mobileMenu.inert = true

  const setMenu = (open, { restoreFocus = false } = {}) => {
    if (!burger || !mobileMenu) return
    if (open === (burger.getAttribute('aria-expanded') === 'true')) return

    burger.setAttribute('aria-expanded', String(open))
    burger.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi')
    mobileMenu.classList.toggle('is-open', open)
    mobileMenu.setAttribute('aria-hidden', String(!open))
    mobileMenu.inert = !open
    nav?.classList.toggle('is-menu-open', open)
    document.body.style.overflow = open ? 'hidden' : ''

    ;[main, footer, navLogo, navCta].forEach((element) => {
      if (element) element.inert = open
    })

    if (open) {
      lastFocused = document.activeElement
      window.setTimeout(() => mobileMenu.querySelector('a')?.focus(), 80)
    } else if (restoreFocus && lastFocused instanceof HTMLElement) {
      lastFocused.focus()
    }
  }

  burger?.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') !== 'true'
    setMenu(open, { restoreFocus: !open })
  })

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      const target = document.querySelector(link.getAttribute('href'))
      setMenu(false)

      if (target) {
        target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
      }
    })
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && burger?.getAttribute('aria-expanded') === 'true') {
      setMenu(false, { restoreFocus: true })
    }
  })

  const desktopQuery = window.matchMedia('(min-width: 1081px)')
  const onDesktop = (event) => {
    if (event.matches) setMenu(false)
  }
  desktopQuery.addEventListener('change', onDesktop)

  /* ------------------------------------------------------- menu filters */
  const chips = Array.from(document.querySelectorAll('.chip'))
  const items = Array.from(document.querySelectorAll('.menu-item'))
  const groups = Array.from(document.querySelectorAll('.menu__group'))

  const applyFilter = (filter) => {
    items.forEach((item) => {
      const visible = filter === 'all' || item.dataset.cat === filter
      item.classList.toggle('is-hidden', !visible)
    })

    document.querySelectorAll('.menu__sub').forEach((sub) => {
      const list = sub.nextElementSibling
      const hasVisible = !!list?.querySelector('.menu-item:not(.is-hidden)')
      sub.classList.toggle('is-hidden', !hasVisible)
      list?.classList.toggle('is-hidden', !hasVisible)
    })

    groups.forEach((group) => {
      const hasVisible = !!group.querySelector('.menu-item:not(.is-hidden)')
      group.classList.toggle('is-hidden', !hasVisible)
    })

    window.dispatchEvent(new CustomEvent('kamcur:layout'))
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((other) => {
        other.classList.toggle('is-active', other === chip)
        other.setAttribute('aria-pressed', String(other === chip))
      })
      applyFilter(chip.dataset.filter || 'all')
    })
  })

  /* -------------------------------------------------- active nav section */
  const sections = Array.from(document.querySelectorAll('main section[id]'))
  const navLinks = Array.from(document.querySelectorAll('.nav__links a'))

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          navLinks.forEach((link) => {
            const active = link.getAttribute('href') === `#${entry.target.id}`
            link.classList.toggle('is-active', active)
            if (active) link.setAttribute('aria-current', 'location')
            else link.removeAttribute('aria-current')
          })
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => spy.observe(section))
  }

  return { applyFilter, closeMenu: () => setMenu(false) }
}
