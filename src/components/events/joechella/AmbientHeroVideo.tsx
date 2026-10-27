'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  src?: string
  /** Server-rendered poster image, shown underneath the video. */
  poster: ReactNode
  /** Server-rendered gradient overlays, drawn above the video. */
  overlays: ReactNode
}

/**
 * Muted, looping background video for the festival hero. The poster image is
 * rendered by the server underneath, so the video only fades in once it is
 * actually playing. The pause control sits outside the background layer so it
 * stays clickable above the hero content. It never loads for reduced-motion or Save-Data visitors,
 * and a visible control lets anyone pause it.
 */
export default function AmbientHeroVideo({ src, poster, overlays }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (!src || reduce.matches || connection?.saveData) return
    setEnabled(true)

    function handleChange(event: MediaQueryListEvent) {
      if (event.matches) {
        videoRef.current?.pause()
        setPaused(true)
      }
    }
    reduce.addEventListener('change', handleChange)
    return () => reduce.removeEventListener('change', handleChange)
  }, [src])

  useEffect(() => {
    const video = videoRef.current
    if (!enabled || !video) return
    video.muted = true
    const attempt = video.play()
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => setPaused(true))
    }
  }, [enabled])

  function toggle() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play()
      setPaused(false)
    } else {
      video.pause()
      setPaused(true)
    }
  }

  return (
    <>
      <div className="jc-hero-media absolute inset-0 -z-10">
        {poster}
        {enabled ? (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover ${playing ? 'jc-playing' : ''}`}
            src={src}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setPlaying(true)}
          />
        ) : null}
        {overlays}
      </div>
      {enabled ? (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? 'Play background video' : 'Pause background video'}
          className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/40 text-[#FCF4EB] backdrop-blur-md transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BDB3E8] md:bottom-8 md:right-8 md:top-auto"
        >
          {paused ? (
            <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true">
              <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
            </svg>
          )}
        </button>
      ) : null}
    </>
  )
}
