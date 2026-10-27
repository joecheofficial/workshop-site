'use client'

import { useEffect } from 'react'

/**
 * Scroll reveals for the festival layout. Blocks marked with data-jc-reveal are
 * visible in the server HTML. Blocks marked with data-jc-line only animate
 * their timeline rail, never their opacity. On mount, only blocks that start below the fold
 * are hidden, then revealed as they enter the viewport. Reduced motion and
 * browsers without IntersectionObserver keep everything static and visible.
 */
export default function FestivalMotion() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-jc-reveal], [data-jc-line]'))
    const viewportBottom = window.innerHeight * 0.92
    const pending = nodes.filter((node) => node.getBoundingClientRect().top > viewportBottom)
    if (pending.length === 0) return

    pending.forEach((node) => node.classList.add('jc-pending'))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const node = entry.target as HTMLElement
          node.classList.add('jc-in')
          node.classList.remove('jc-pending')
          observer.unobserve(node)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    pending.forEach((node) => observer.observe(node))

    return () => {
      observer.disconnect()
      pending.forEach((node) => node.classList.remove('jc-pending'))
    }
  }, [])

  return null
}
