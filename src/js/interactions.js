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

  /* ------------------------------------------------------------- ordering */
  const orderDialog = document.getElementById('orderDialog')
  const orderBar = document.getElementById('orderBar')
  const orderLines = document.getElementById('orderLines')
  const orderEmpty = document.getElementById('orderEmpty')
  const orderSend = document.getElementById('orderSend')
  const orderClear = document.getElementById('orderClear')
  const orderName = document.getElementById('orderName')
  const orderNote = document.getElementById('orderNote')
  const orderFeedback = document.getElementById('orderFeedback')
  const toast = document.getElementById('toast')

  const menuItems = Array.from(document.querySelectorAll('.menu-item'))
  const itemsByIndex = new Map()
  const order = new Map()
  let toastTimer = null

  const formatRupiah = (value) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value)

  const showToast = (message) => {
    if (!toast) return
    toast.textContent = message
    toast.classList.add('is-visible')
    window.clearTimeout(toastTimer)
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2800)
  }

  const showOrderFeedback = (message) => {
    if (orderFeedback) orderFeedback.textContent = message
  }

  const getOrderTotal = () =>
    Array.from(order.entries()).reduce((total, [index, qty]) => {
      const item = itemsByIndex.get(index)
      return item ? total + item.price * qty : total
    }, 0)

  const copyText = async (text) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        return true
      }
    } catch {}

    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.top = '-1000px'
    document.body.appendChild(area)
    area.select()

    let copied = false
    try {
      copied = document.execCommand('copy')
    } catch {}

    area.remove()
    return copied
  }

  menuItems.forEach((item) => {
    const index = item.querySelector('.menu-item__idx')?.textContent.trim() || ''
    const name = item.querySelector('.menu-item__name')?.textContent.trim() || ''
    const priceText = item.querySelector('.menu-item__price')?.textContent.trim() || ''
    const price = Number(priceText.replace(/[^\d]/g, '')) * 1000

    if (!index || !name || !price) return

    itemsByIndex.set(index, { index, name, price, priceText })
    item.setAttribute('aria-label', `Tambah ${name} ke pesanan, ${priceText}`)

    item.addEventListener('click', () => {
      order.set(index, (order.get(index) || 0) + 1)
      item.classList.add('is-added')
      window.setTimeout(() => item.classList.remove('is-added'), 700)
      updateOrder()
      showToast(`${name} masuk pesanan.`)
    })
  })

  const updateOrder = () => {
    if (!orderBar) return

    const entries = Array.from(order.entries())
    const count = entries.reduce((total, [, qty]) => total + qty, 0)
    const total = getOrderTotal()
    const hasItems = count > 0

    orderBar.hidden = !hasItems
    document.querySelectorAll('[data-order-count]').forEach((element) => {
      element.textContent = String(count)
    })
    document.querySelectorAll('[data-order-total]').forEach((element) => {
      element.textContent = formatRupiah(total)
    })

    if (orderSend) orderSend.disabled = !hasItems
    if (orderClear) orderClear.disabled = !hasItems
    if (orderEmpty) orderEmpty.hidden = hasItems

    if (orderLines) {
      orderLines.hidden = !hasItems
      orderLines.innerHTML = entries
        .map(([index, qty]) => {
          const item = itemsByIndex.get(index)
          if (!item) return ''
          const removeLabel = qty === 1 ? `Hapus ${item.name}` : `Kurangi ${item.name}`

          return `
            <article class="order-line">
              <div class="order-line__copy">
                <p class="order-line__name">${item.name}</p>
                <p class="order-line__unit">${item.priceText} x ${qty}</p>
              </div>
              <div class="order-line__side">
                <div class="order-line__controls">
                  <button
                    class="qty"
                    type="button"
                    data-order-step="-1"
                    data-order-id="${item.index}"
                    aria-label="${removeLabel}"
                  >-</button>
                  <span class="order-line__qty">${qty}</span>
                  <button
                    class="qty"
                    type="button"
                    data-order-step="1"
                    data-order-id="${item.index}"
                    aria-label="Tambah ${item.name}"
                  >+</button>
                </div>
                <strong class="order-line__total">${formatRupiah(item.price * qty)}</strong>
              </div>
            </article>
          `
        })
        .join('')
    }
  }

  const openDialog = (dialog) => {
    if (!dialog) return
    if (!dialog.open) dialog.showModal()
    document.body.classList.add('is-modal-open')
  }

  if (orderDialog) {
    orderDialog.querySelectorAll('[data-close]').forEach((button) => {
      button.addEventListener('click', () => orderDialog.close())
    })

    orderDialog.addEventListener('click', (event) => {
      if (event.target === orderDialog) orderDialog.close()
    })

    orderDialog.addEventListener('close', () => {
      document.body.classList.remove('is-modal-open')
    })
  }

  document.querySelectorAll('[data-order-open]').forEach((button) => {
    button.addEventListener('click', () => {
      showOrderFeedback('')
      openDialog(orderDialog)
    })
  })

  orderLines?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-order-step]')
    if (!button) return

    const index = button.dataset.orderId
    const next = (order.get(index) || 0) + Number(button.dataset.orderStep)
    if (next <= 0) order.delete(index)
    else order.set(index, next)
    updateOrder()
  })

  orderClear?.addEventListener('click', () => {
    order.clear()
    updateOrder()
    showOrderFeedback('Pesanan dikosongkan.')
  })

  orderName?.addEventListener('input', () => {
    if (!orderName.value.trim()) return
    orderName.removeAttribute('aria-invalid')
    orderName.closest('.field')?.classList.remove('is-invalid')
  })

  orderSend?.addEventListener('click', async () => {
    if (!order.size) return

    if (!orderName?.value.trim()) {
      orderName?.setAttribute('aria-invalid', 'true')
      orderName?.closest('.field')?.classList.add('is-invalid')
      orderName?.focus()
      showOrderFeedback('Isi nama atau nomor meja dulu.')
      return
    }

    const lines = Array.from(order.entries()).map(([index, qty], position) => {
      const item = itemsByIndex.get(index)
      return `${position + 1}. ${item.name} x${qty} = ${formatRupiah(item.price * qty)}`
    })
    const note = orderNote?.value.trim()
    const message = [
      'Pesanan KAMCUR SPACE',
      ...lines,
      '',
      `Total: ${formatRupiah(getOrderTotal())}`,
      `Nama/meja: ${orderName.value.trim()}`,
    ]

    if (note) message.push(`Catatan: ${note}`)
    message.push('', 'Dikirim dari website KAMCUR SPACE.')

    const copied = await copyText(message.join('\n'))
    showOrderFeedback(
      copied
        ? 'Pesanan disalin. Buka Instagram, lalu tempel di DM.'
        : 'Pesanan siap. Buka Instagram, lalu salin manual.',
    )
  })

  updateOrder()

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
