'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'

export function useInfiniteLoop<T>(items: T[], axis: 'x' | 'y') {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const initialized = useRef(false)

  const tripled = useMemo(() => {
    if (!items || items.length === 0) return []
    return [...items, ...items, ...items]
  }, [items])

  const getScroll = useCallback(
    (el: HTMLDivElement) => (axis === 'y' ? el.scrollTop : el.scrollLeft),
    [axis],
  )
  const setScroll = useCallback(
    (el: HTMLDivElement, value: number) => {
      if (axis === 'y') el.scrollTop = value
      else el.scrollLeft = value
    },
    [axis],
  )
  const getSetLength = useCallback(
    (el: HTMLDivElement) => (axis === 'y' ? el.scrollHeight : el.scrollWidth) / 3,
    [axis],
  )

  // Land in the middle copy on mount / whenever the item count changes.
  useEffect(() => {
    const el = containerRef.current
    if (!el || items.length === 0) return
    const timer = setTimeout(() => {
      const setLength = getSetLength(el)
      if (setLength > 0) {
        setScroll(el, setLength)
        initialized.current = true
      }
    }, 50)
    return () => clearTimeout(timer)
  }, [items.length, getSetLength, setScroll])

  const handleScroll = useCallback(() => {
    const el = containerRef.current
    if (!el || !initialized.current || items.length === 0) return
    const setLength = getSetLength(el)
    if (setLength <= 0) return
    const pos = getScroll(el)

    if (pos < setLength * 0.5) {
      setScroll(el, pos + setLength)
    } else if (pos > setLength * 1.5) {
      setScroll(el, pos - setLength)
    }
  }, [items.length, getSetLength, getScroll, setScroll])

  return { containerRef, tripled, handleScroll }
}
