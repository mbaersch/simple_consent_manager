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
### v0.9.8 (2026-01-29)
- New centralized `ui` configuration section
- Improved domain detection (localhost, IPs, special TLDs)
- Removed debug logging
- Removed obsolete browser prefixes
- Fixed bug: group3 checkbox used wrong default value
- Added CLAUDE.md for AI assistant context

### v0.9.7.1 (2025-12-21)
- Previous stable version
