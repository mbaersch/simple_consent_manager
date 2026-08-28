# Simple Consent Manager
Simple custom JavaScript-only consent manager script. Only German comments included - sorry.

**Note**: This script is still work in progress, even if this thing is in use at https://www.analytrix.de since 2018. Use it at your own technical and legal risk.

## Documentation / Example
There is a live example and documentation (in German language) for an older version (without dataLayer support and Consent Mode options) available at https://www.analytrix.de/simple-consent-manager.html. Newer options are described briefly in the main file.

## Features
- Extensive configuration object for all options, texts, cookie descriptions, layout
- Centralized UI configuration (`ui` section) for easy customization of texts, button styles, and links
- Can be used with multiple or a single category / group
- Different display modes: `overlay`, `center`, `top`, `bottom`
- **Optional 2-layer architecture** (`mgmcUseTwoLayer`): slim first banner with link to a detail dialog (category blocks + cookie table)
- **Optional CSS auto-injection** (`mgmcInjectStyles`): ready-to-use styles for cookie table (sticky header, fixed columns), category blocks and absolutely-positioned close button
- **Configurable z-index** (`mgmcZIndex`): adjust for sites with sticky headers or other high stack contexts
- **Per-group dataLayer keys** (`dataLayerKey`): rename `tracking`/`group2`/`group3` in the `consent_ready` event to project-specific names like `statistics`/`marketing`/`embedded`
- **Optional delayed reveal + fade-in** (`mgmcDelayedReveal`): show the banner only on the first user interaction (scroll/wheel/touch/key/link click) with a soft ~1s CSS keyframe fade-in
- **Optional mobile bottom docking** (`mgmcMobileBottom`): dock the banner to the bottom edge on narrow viewports (≤640px) via an injected media query
- Optionally pushes consent to dataLayer
- Supports Google Consent Mode v2, MS UET Consent Mode, MS Clarity Consent Mode
- Robust domain detection (handles localhost, IPs, special TLDs like .co.uk)
- Optional consent key for documentation purposes
- Cookie versioning to re-request consent when scope changes

## Configuration
All configuration is done in the `window.mgmcConfig` object at the top of the file:

```javascript
window.mgmcConfig = {
  mgmcConsentCookieMonths: 12,      // Cookie lifetime
  mgmcConsentCookieVersion: 3,      // Increment to re-request consent
  mgmcConsentStyle: "overlay",      // Display mode

  // UI configuration (texts, styles, links)
  ui: {
    dialogTitle: "Your Title",
    dialogIntro: "Your intro text...",
    buttons: {
      minimal: "Only necessary",
      acceptAll: "Accept all",
      // ... more button labels
    },
    buttonStyle: "...",             // CSS for regular buttons
    okButtonStyle: "...",           // CSS for primary button
    links: {
      privacy: "/privacy.html",
      imprint: "/imprint.html"
    }
  },

  // Cookie groups (essential, tracking, group2, group3)
  essentialCookies: { ... },
  trackingCookies: { ... },
  group2Cookies: { ... },
  group3Cookies: { ... },

  // Callback after consent
  consentCallback: function(ok) { ... }
}
```

## Data Layer Format
If a dataLayer event name is defined (default: `consent_ready`), a push with all current states for groups will occur. Example:
```javascript
{
  event: "consent_ready",
  consentInfo: {
    tracking: true,
    group2: false,
    group3: false
  }
}
```

## Public Functions
- `initConsent()` - Initialize and show banner if no consent exists
- `showConsentInfo()` - Show settings dialog
- `getGroupConsent(marker)` - Check consent for a group ("1", "2", "3")
- `delConsentCookie()` - Delete consent cookie
- `resetConsentBanner()` - Remove banner from DOM

## Changelog
### v0.11.1 (2026-08-28)
**Bugfix — a "reject all" decision was silently swallowed:**
- `saveConsent()` guarded its final block with `cnsArray[0] != ""`. The reject
  button calls `saveConsent([0])` with the **number** `0`, and `0 != ""`
  evaluates to `false` — so neither `handleDataLayer()` nor `consentCallback()`
  ran on a rejection. No Consent Mode update, no revoke handler, no dataLayer
  event. Now compared strictly, so only the reset call `saveConsent([""])`
  skips the block.
- The value handed to `consentCallback()` was `val != '0|'`. By that point the
  consent key and cookie version are already appended to `val`, so it is never
  exactly `'0|'` and the callback always received `true` — including on a
  rejection. Integrations that act on that parameter alone would have enabled
  tracking after a rejection. It is now derived from `allOff`.

> **Behavior change:** `consentCallback(ok)` now receives `false` when the
> visitor rejects everything. Previously it always received `true`. Callbacks
> that additionally check `getGroupConsent()` are unaffected.

### v0.11.0 (2026-07-01)
**New opt-in features (both default `false`, previous behavior unchanged):**
- `mgmcDelayedReveal` (default `false`): when `true`, the banner is no longer shown immediately on load. Instead `armConsentReveal()` waits for the first user interaction (scroll/wheel/touch/keydown or a link click) and then reveals the banner with a soft ~1s CSS keyframe fade-in (overlay fades, inner box slides up, dimmer fades). The first link click is suppressed once so the banner appears before navigation. The animation replays on every re-open.
- `mgmcMobileBottom` (default `false`): when `true`, an injected media query docks the banner to the bottom edge on viewports ≤640px, overriding the desktop inline positioning via `!important`. Desktop positioning is untouched.
- Both features inject only the CSS rules they need via a separate `<style id="mgmc-runtime-styles">` block, **independent of `mgmcInjectStyles`** — so fade-in and mobile docking work without the full table-styling block.

Ported from the gandke.de instance (originally `0.9.8.3-gandke.x`), reworked as clean opt-in flags on top of the canonical two-layer implementation.

### v0.10.0 (2026-04-28)
**New opt-in features (all defaults preserve previous behavior, no migration needed):**
- `mgmcUseTwoLayer` (default `false`): when `true`, `oid=0` renders a slim first-layer banner; the new `oid=2` opens the detail dialog with category blocks and the cookie table. Settings link transitions via `showHideConsentBanner(0); showHideConsentBanner(2);`.
- `mgmcInjectStyles` (default `false`): when `true`, a `<style id="mgmc-styles">` block is injected into `<head>` on first banner render. Provides cookie-table layout (sticky header, fixed column widths, padding), category-block styles and an absolutely-positioned close button (fixes click-through issues with floated `<a>` over a `position: relative` `<h2>`).
- `mgmcZIndex` (default `1000`): base z-index for the overlay. Backdrop = `mgmcZIndex - 1`, inner wrapper = `mgmcZIndex + 1`. Raise to `99990` or similar on sites with sticky headers / high stack contexts.
- `dataLayerKey` per group (`trackingCookies`, `group2Cookies`, `group3Cookies`): rename the property names in the `consent_ready` event. Falls back to the previous defaults (`tracking`/`group2`/`group3`) when not set.
- `ui.firstLayerTitle` / `ui.firstLayerIntro` / `ui.buttons.openSettings`: optional texts for the first layer (only relevant when `mgmcUseTwoLayer` is enabled). Empty values fall back to `dialogTitle` / `dialogIntro`.

**Bug fixes:**
- `buildConsentChoice()` now safely handles missing `checkgrp1` element (previously crashed in two-layer first-layer rendering paths).

**Backward compatibility:** existing configurations without any of the new flags render and behave identically to v0.9.8. Migration is purely opt-in.

### v0.9.8 (2026-01-29)
- New centralized `ui` configuration section
- Improved domain detection (localhost, IPs, special TLDs)
- Removed debug logging
- Removed obsolete browser prefixes
- Fixed bug: group3 checkbox used wrong default value
- Added CLAUDE.md for AI assistant context

### v0.9.7.1 (2025-12-21)
- Previous stable version

---
*Letzte Aktualisierung: 2026-08-28 12:10*
