import * as THREE from 'three'

export function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    )
  } catch {
    return false
  }
}

function makeShadowTexture() {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(23,17,11,0.55)')
  gradient.addColorStop(0.5, 'rgba(23,17,11,0.2)')
  gradient.addColorStop(1, 'rgba(23,17,11,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function makeBandTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#4a2c18'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#c9a46a'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = '700 118px "Archivo Black", "Arial Black", sans-serif'
  ctx.letterSpacing = '14px'
  ctx.fillText('KAMCUR SPACE', canvas.width / 2, canvas.height / 2 + 4)

  ctx.font = '500 34px "Space Grotesk", Arial, sans-serif'
  ctx.letterSpacing = '10px'
  ctx.fillStyle = 'rgba(243,235,221,0.72)'
  ctx.fillText('GOOD COFFEE · GOOD PEOPLE · GOOD SPACE', canvas.width / 2, canvas.height - 26)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

export function initCoffeeScene(container) {
  if (!container || !supportsWebGL()) {
    throw new Error('WebGL unavailable')
  }

  const coarsePointer = window.matchMedia('(hover: none)').matches
  const lowPower = (navigator.deviceMemory || 8) <= 2

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.8))
  renderer.setSize(container.clientWidth || 1, container.clientHeight || 1, false)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
  camera.position.set(0, 0.4, 5.4)
  camera.lookAt(0, 0.05, 0)

  const hemi = new THREE.HemisphereLight(0xfff3df, 0x4a2c18, 1.15)
  scene.add(hemi)

  const key = new THREE.DirectionalLight(0xffe9cd, 2.6)
  key.position.set(4, 6, 5)
  scene.add(key)

  const rim = new THREE.DirectionalLight(0xf2c078, 1.5)
  rim.position.set(-5, 2, -4)
  scene.add(rim)

  const warm = new THREE.PointLight(0xf5c98a, 18, 14, 2)
  warm.position.set(-2.6, 2.4, 3)
  scene.add(warm)

  const root = new THREE.Group()
  root.position.y = -0.62
  scene.add(root)

  const clay = new THREE.MeshStandardMaterial({
    color: 0xf1e7d7,
    roughness: 0.52,
    metalness: 0.04,
  })

  const saucerProfile = [
    [0, 0],
    [0.82, 0],
    [1.08, 0.05],
    [1.32, 0.13],
    [1.34, 0.19],
    [1.1, 0.12],
    [0.78, 0.07],
    [0, 0.06],
  ].map(([x, y]) => new THREE.Vector2(x, y))

  const saucer = new THREE.Mesh(new THREE.LatheGeometry(saucerProfile, 72), clay)
  saucer.position.y = -0.02
  root.add(saucer)

  const cupProfile = [
    [0, 0],
    [0.5, 0],
    [0.6, 0.05],
    [0.72, 0.45],
    [0.9, 1.1],
    [0.96, 1.28],
    [0.9, 1.29],
    [0.84, 1.12],
    [0.68, 0.48],
    [0.56, 0.12],
    [0, 0.12],
  ].map(([x, y]) => new THREE.Vector2(x, y))

  const cup = new THREE.Mesh(new THREE.LatheGeometry(cupProfile, 96), clay)
  cup.position.y = 0.06
  root.add(cup)

  const bandTexture = makeBandTexture()
  bandTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8)
  const band = new THREE.Mesh(
    new THREE.CylinderGeometry(0.935, 0.906, 0.18, 72, 1, true),
    new THREE.MeshStandardMaterial({
      map: bandTexture,
      roughness: 0.48,
      metalness: 0.02,
      side: THREE.DoubleSide,
    }),
  )
  band.position.y = 1.17
  root.add(band)

  const coffee = new THREE.Mesh(
    new THREE.CircleGeometry(0.845, 72),
    new THREE.MeshStandardMaterial({
      color: 0x4a2c18,
      roughness: 0.24,
      metalness: 0.05,
    }),
  )
  coffee.rotation.x = -Math.PI / 2
  coffee.position.y = 1.19
  root.add(coffee)

  const crema = new THREE.Mesh(
    new THREE.RingGeometry(0.6, 0.845, 72),
    new THREE.MeshStandardMaterial({
      color: 0x6f4a2e,
      roughness: 0.35,
      metalness: 0.04,
      transparent: true,
      opacity: 0.75,
    }),
  )
  crema.rotation.x = -Math.PI / 2
  crema.position.y = 1.193
  root.add(crema)

  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.33, 0.082, 20, 64, Math.PI * 1.35),
    clay,
  )
  handle.position.set(0.94, 0.76, 0)
  handle.rotation.z = -Math.PI * 0.28
  root.add(handle)

  const beanGroup = new THREE.Group()
  root.add(beanGroup)

  const beanMaterial = new THREE.MeshStandardMaterial({
    color: 0x3a2312,
    roughness: 0.62,
    metalness: 0.06,
  })
  const creaseMaterial = new THREE.MeshStandardMaterial({
    color: 0x1c1109,
    roughness: 0.7,
  })

  const beanGeometry = new THREE.SphereGeometry(0.13, 18, 14)
  const creaseGeometry = new THREE.BoxGeometry(0.012, 0.15, 0.02)
  const beanCount = lowPower ? 4 : 7
  const beans = []

  for (let i = 0; i < beanCount; i += 1) {
    const bean = new THREE.Group()
    const body = new THREE.Mesh(beanGeometry, beanMaterial)
    body.scale.set(1, 0.7, 0.62)
    const crease = new THREE.Mesh(creaseGeometry, creaseMaterial)
    crease.position.set(0, 0, 0.075)
    crease.rotation.z = 0.18
    bean.add(body, crease)

    const angle = (i / beanCount) * Math.PI * 2
    const radius = 1.5 + (i % 3) * 0.22
    bean.position.set(Math.cos(angle) * radius, 0.25 + (i % 4) * 0.32, Math.sin(angle) * radius)
    bean.rotation.set(angle * 0.6, angle, angle * 0.4)
    bean.userData = {
      baseY: bean.position.y,
      phase: angle,
      spin: 0.3 + (i % 3) * 0.16,
    }
    beanGroup.add(bean)
    beans.push(bean)
  }

  const shadowTexture = makeShadowTexture()
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(4.2, 4.2),
    new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.8,
    }),
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = -0.7
  scene.add(shadow)

  let targetX = 0
  let targetY = 0
  let pointerX = 0
  let pointerY = 0

  const onPointerMove = (event) => {
    targetX = (event.clientX / window.innerWidth) * 2 - 1
    targetY = (event.clientY / window.innerHeight) * 2 - 1
  }

  if (!coarsePointer) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
  }

  let scrollProgress = 0
  const hero = container.closest('.hero') || container

  const onScroll = () => {
    const rect = hero.getBoundingClientRect()
    scrollProgress = THREE.MathUtils.clamp(-rect.top / Math.max(rect.height, 1), 0, 1)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  let visible = true
  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting
    },
    { threshold: 0.01 },
  )
  io.observe(container)

  const resize = () => {
    const width = container.clientWidth
    const height = container.clientHeight
    if (!width || !height) return
    renderer.setSize(width, height, false)
    const aspect = width / height
    camera.aspect = aspect
    camera.fov = aspect < 0.85 ? 38 : 32
    camera.position.z = aspect < 0.85 ? 6.2 : 5.4
    camera.updateProjectionMatrix()
  }

  const ro = new ResizeObserver(resize)
  ro.observe(container)
  resize()

  const onContextLost = (event) => {
    event.preventDefault()
    container.classList.remove('is-ready')
  }
  renderer.domElement.addEventListener('webglcontextlost', onContextLost, false)

  const clock = new THREE.Clock()
  let rafId = 0
  let elapsed = 0
  let motionPaused = document.documentElement.dataset.motion === 'paused'

  const onMotion = (event) => {
    motionPaused = Boolean(event.detail?.paused)
  }
  window.addEventListener('kamcur:motion', onMotion)

  const frame = () => {
    rafId = requestAnimationFrame(frame)
    if (!visible) return

    const delta = Math.min(clock.getDelta(), 0.05)
    if (!motionPaused) elapsed += delta
    const t = elapsed

    pointerX += (targetX - pointerX) * 0.06
    pointerY += (targetY - pointerY) * 0.06

    root.rotation.y = pointerX * 0.55 + Math.sin(t * 0.45) * 0.12 + scrollProgress * 0.9
    root.rotation.x = -pointerY * 0.2 + Math.sin(t * 0.7) * 0.03
    root.rotation.z = pointerX * 0.05
    root.position.y = -0.62 + Math.sin(t * 0.9) * 0.045 + scrollProgress * 0.3

    if (!motionPaused) {
      beanGroup.rotation.y = t * 0.22 + pointerX * 0.25
      beans.forEach((bean) => {
        bean.position.y = bean.userData.baseY + Math.sin(t * 1.1 + bean.userData.phase) * 0.07
        bean.rotation.x += 0.002 * bean.userData.spin
        bean.rotation.z += 0.0015 * bean.userData.spin
      })
    }

    camera.position.y = 0.4 + pointerY * 0.08 - scrollProgress * 0.2
    camera.lookAt(0, 0.05, 0)

    renderer.render(scene, camera)

    if (!container.classList.contains('is-ready')) {
      container.classList.add('is-ready')
    }
  }

  frame()

  return {
    destroy() {
      cancelAnimationFrame(rafId)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('kamcur:motion', onMotion)
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost)

      scene.traverse((object) => {
        if (!object.isMesh) return
        object.geometry?.dispose()
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach((material) => {
          if (!material) return
          material.map?.dispose()
          material.dispose()
        })
      })

      shadowTexture.dispose()
      bandTexture.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}
