import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function revealOnScroll() {
  gsap.utils.toArray('.reveal').forEach((element) => {
    gsap.from(element, {
      y: 34,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        once: true,
      },
    })
  })

  gsap.utils.toArray('.pillar').forEach((pillar, index) => {
    gsap.from(pillar, {
      y: 26,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about__pillars',
        start: 'top 82%',
        once: true,
      },
    })
  })
}

function heroIntro() {
  const timeline = gsap.timeline({
    defaults: { ease: 'power4.out' },
    delay: 0.1,
  })

  timeline
    .from('.hero__line > span', {
      yPercent: 118,
      duration: 1.15,
      stagger: 0.09,
    })
    .from(
      '[data-hero="fade"]',
      {
        y: 22,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
      },
      0.35,
    )

  return timeline
}

function horizontalGallery() {
  const media = gsap.matchMedia()

  media.add('(min-width: 1081px)', () => {
    const section = document.querySelector('.space')
    const viewport = document.getElementById('spaceViewport')
    const track = document.getElementById('spaceTrack')
    if (!section || !viewport || !track) return

    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
    if (distance() < 40) return

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      gsap.set(track, { clearProps: 'transform' })
    }
  })

  return media
}

function footerReveal() {
  gsap.from('.footer__logo', {
    yPercent: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 92%',
      once: true,
    },
  })
}

export function initAnimations() {
  revealOnScroll()
  footerReveal()
  const gallery = horizontalGallery()

  const refresh = () => ScrollTrigger.refresh()

  window.addEventListener('load', refresh, { once: true })

  if (document.fonts?.ready) {
    document.fonts.ready.then(refresh).catch(() => {})
  }

  return {
    playIntro: heroIntro,
    refresh,
    destroy() {
      gallery.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    },
  }
}
