// ---------------------------------------------------------------------------
// "Came from the DM" marker for giveaway pages.
//
// The ManyChat keyword flow already asks for the visitor's name and email
// before it sends the link. When that link carries ?via=dm, the page must not
// ask for the email again (Illy, 2026-10-13). Anyone who arrives another way
// still gets one email ask, after they copy or download.
//
// The marker is remembered for the browser tab, so in-page navigation and a
// refresh do not bring the ask back.
// ---------------------------------------------------------------------------

export const DM_MARKER_PARAM = 'via'
export const DM_MARKER_VALUE = 'dm'
export const DM_SESSION_KEY = 'giveaway-from-dm'

/** True when a query string (with or without the leading "?") carries the DM marker. */
export function hasDmMarker(search: string): boolean {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  return params.get(DM_MARKER_PARAM)?.trim().toLowerCase() === DM_MARKER_VALUE
}

/** Browser only. True when this visit, or an earlier page in this tab, came from the DM link. */
export function isFromDmVisit(): boolean {
  if (typeof window === 'undefined') return false
  if (hasDmMarker(window.location.search)) {
    try { window.sessionStorage.setItem(DM_SESSION_KEY, '1') } catch { /* storage blocked */ }
    return true
  }
  try {
    return window.sessionStorage.getItem(DM_SESSION_KEY) === '1'
  } catch {
    return false
  }
}
