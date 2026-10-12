/*
 * MHQ Meta Pixel + EU/UK consent for the static HTML pages in /public
 * (decks.mastermindshq.business and the standalone .html giveaways).
 * Same rules as src/components/consent/MetaPixelConsent.tsx:
 * - mhq_cr=0: load the pixel normally, no banner.
 * - required and mhq_consent != granted: load nothing, queue fbq calls in memory,
 *   show the banner unless the visitor declined.
 * Include once per page: <script src="/mhq-consent.js" defer></script>
 */
(function () {
  if (window.__mhqConsentStatic) return
  window.__mhqConsentStatic = true

  var PIXELS = ['1412328130577658', '143350696292417']
  var FBEVENTS = 'https://connect.facebook.net/en_US/fbevents.js'
  var host = location.host
  var hostname = location.hostname.toLowerCase()
  var isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]' || /\.localhost$/.test(hostname)
  var domain = hostname === 'mastermindshq.business' || /\.mastermindshq\.business$/.test(hostname) ? '.mastermindshq.business' : null

  function readAll(name) {
    var out = []
    document.cookie.split(';').forEach(function (part) {
      var i = part.indexOf('=')
      if (i < 0) return
      if (part.slice(0, i).trim() === name) {
        var v = part.slice(i + 1).trim()
        try { v = decodeURIComponent(v) } catch (e) {}
        out.push(v)
      }
    })
    return out
  }
  function setCookie(name, value, maxAge) {
    document.cookie = name + '=' + encodeURIComponent(value) + '; Max-Age=' + maxAge +
      (domain ? '; Domain=' + domain : '') + '; Path=/; SameSite=Lax' + (isLocal ? '' : '; Secure')
  }
  function expireHostOnly(name) { document.cookie = name + '=; Max-Age=0; Path=/' }

  // Prefer the domain-wide mhq_consent: drop a host-only duplicate.
  if (readAll('mhq_consent').length > 1) expireHostOnly('mhq_consent')

  // Standard fbq stub. It queues in memory and loads nothing by itself.
  if (!window.fbq) {
    var n = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }
    if (!window._fbq) window._fbq = n
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = []
    window.fbq = n
  }
  if (!window.__mhqPixelInit) {
    window.__mhqPixelInit = true
    PIXELS.forEach(function (id) { window.fbq('init', id) })
    window.fbq('track', 'PageView')
  }

  function loadPixel() {
    if (document.getElementById('mhq-fbevents') || document.querySelector('script[src*="fbevents.js"]')) return
    var s = document.createElement('script')
    s.async = true; s.id = 'mhq-fbevents'; s.src = FBEVENTS
    document.head.appendChild(s)
  }
  function required() {
    if (isLocal) return false
    return readAll('mhq_cr')[0] !== '0'
  }
  function consent() {
    var v = readAll('mhq_consent')
    return v.indexOf('denied') >= 0 ? 'denied' : v[0]
  }

  var banner = null
  var settingsLink = null
  function hideBanner() { if (banner) { banner.remove(); banner = null } }
  function choose(value) {
    if (domain) expireHostOnly('mhq_consent')
    setCookie('mhq_consent', value, 15552000)
    hideBanner()
    window.fbq('consent', value === 'granted' ? 'grant' : 'revoke')
    if (value === 'granted') loadPixel()
  }
  function showBanner() {
    if (banner) return
    banner = document.createElement('div')
    banner.setAttribute('role', 'dialog')
    banner.setAttribute('aria-label', 'Cookie consent')
    banner.setAttribute('aria-modal', 'false')
    banner.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;margin:0 auto;max-width:640px;z-index:45;' +
      'box-sizing:border-box;background:rgba(21,21,21,0.96);color:#FCF4EB;border:1px solid rgba(255,255,255,0.12);' +
      'border-radius:16px;padding:16px 18px;box-shadow:0 12px 40px rgba(0,0,0,0.45);' +
      'font:14px/1.6 "Plus Jakarta Sans",system-ui,-apple-system,sans-serif;backdrop-filter:blur(8px)'
    var p = document.createElement('p')
    p.style.cssText = 'margin:0'
    p.appendChild(document.createTextNode('We use cookies to measure our ads and improve the site. Accept to allow analytics and ad tracking, or decline and nothing is tracked. '))
    var a = document.createElement('a')
    a.href = 'https://mastermindshq.business/privacy'
    a.target = '_blank'; a.rel = 'noopener noreferrer'
    a.textContent = 'Privacy'
    a.style.cssText = 'color:#BDB3E8;text-decoration:underline'
    p.appendChild(a)
    var row = document.createElement('div')
    row.style.cssText = 'display:flex;gap:12px;margin-top:14px'
    ;['Accept', 'Decline'].forEach(function (label) {
      var b = document.createElement('button')
      b.type = 'button'
      b.textContent = label
      b.style.cssText = 'flex:1;min-height:44px;border-radius:12px;border:1px solid rgba(255,255,255,0.16);' +
        'background:rgba(255,255,255,0.06);color:#FCF4EB;font:600 14px/1 "Plus Jakarta Sans",system-ui,sans-serif;cursor:pointer'
      b.addEventListener('click', function () { choose(label === 'Accept' ? 'granted' : 'denied') })
      row.appendChild(b)
    })
    banner.appendChild(p)
    banner.appendChild(row)
    document.body.appendChild(banner)
  }
  function renderSettingsLink() {
    if (!required()) { if (settingsLink) { settingsLink.remove(); settingsLink = null } return }
    if (settingsLink) return
    settingsLink = document.createElement('button')
    settingsLink.type = 'button'
    settingsLink.textContent = 'Cookie settings'
    settingsLink.style.cssText = 'display:block;margin:24px auto 16px;background:none;border:0;color:rgba(252,244,235,0.45);' +
      'font:12px/1.4 "Plus Jakarta Sans",system-ui,sans-serif;text-decoration:underline;cursor:pointer'
    settingsLink.addEventListener('click', function () {
      expireHostOnly('mhq_consent')
      setCookie('mhq_consent', '', 0)
      window.fbq('consent', 'revoke')
      showBanner()
    })
    document.body.appendChild(settingsLink)
  }
  function apply() {
    var req = required()
    var c = consent()
    if (!req || c === 'granted') loadPixel()
    if (req && c !== 'granted' && c !== 'denied') showBanner(); else hideBanner()
    renderSettingsLink()
  }

  function start() {
    apply()
    if (!isLocal && readAll('mhq_cr').length === 0) {
      fetch('/api/consent/region', { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null })
        .catch(function () { return null })
        .then(function (d) {
          if (d && typeof d.required === 'boolean') return d
          return fetch('https://mastermindshq.business/api/consent/region', { credentials: 'include', cache: 'no-store' })
            .then(function (r) { return r.ok ? r.json() : null })
            .catch(function () { return null })
        })
        .then(function (d) {
          if (!d || typeof d.required !== 'boolean') return
          if (readAll('mhq_cr').length === 0) setCookie('mhq_cr', d.required ? '1' : '0', 86400)
          apply()
        })
    }
  }
  if (document.body) start()
  else document.addEventListener('DOMContentLoaded', start)
})()
