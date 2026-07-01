# Simple Consent Manager

## Uberblick
Cookie-basiertes Consent Management f. Tracking-Cookies. Eigenstaendige Single-File-Loesung ohne externe Abhaengigkeiten.

## Architektur
- **Alles in einer Datei** - bewusste Design-Entscheidung fuer einfaches Deployment
- **Konfiguration am Dateianfang** im `window.mgmcConfig` Objekt
- **Live-Version**: `mgm_consent-X.X.X.js` (produktiv im Einsatz, versioniert)
- **Entwicklungsversion**: `mgm_consent.js`

## Wichtige Prinzipien
- Robustheit und Wartbarkeit priorisieren
- UI-Eigenschaften in zentraler `ui`-Sektion ("Config as Code")
- Kein Build-Prozess - direkt einsetzbar
- Keine externen Abhaengigkeiten

## Consent-Gruppen
- **Essential** (immer aktiv, nicht abwaehlbar)
- **Tracking/Statistik** (Gruppe 1, Marker: "1")
- **Werbung** (Gruppe 2, Marker: "2", optional)
- **Externe Inhalte** (Gruppe 3, Marker: "3", optional)

Gruppen werden nur angezeigt, wenn `items.length > 0`.

## Integrationen
- Google Consent Mode v2 (`mgmcGcmEnabled`)
- Microsoft UET Consent Mode (`mgmcMscmEnabled`)
- Microsoft Clarity Consent Mode (`mgmcClcmEnabled`)
- dataLayer Events (`mgmcDataLayerEvent`)

## Cookie-Format
`trk_consent` speichert: `DD.MM.YYYY:MARKER|[CONSENT_KEY]|VERSION:ConVer|`

## Oeffentliche Funktionen
- `initConsent()` - Initialisierung, zeigt Banner bei fehlendem Consent
- `showConsentInfo()` - Zeigt Einstellungsdialog (oid=1)
- `getGroupConsent(marker)` - Prueft Consent fuer Gruppe
- `delConsentCookie()` - Loescht Consent-Cookie
- `resetConsentBanner()` - Entfernt Banner aus DOM

## Hinweise zur Wartung
- `mgmcConsentCookieVersion` erhoehen, wenn Consent neu eingeholt werden muss
- Domain-Erkennung beruecksichtigt Sonderfaelle (.co.uk, localhost, IPs)
- `consentCallback(ok)` fuer projektspezifische Aktionen nach Consent

---

# CLAUDE.md - Standardverfahren

## Versionierung
- Bei jeder Änderung an .js oder .md Dateien: Zeitstempel aktualisieren
- .js im Header: `Version X.Y(.Z)  -  yyyy-mm-dd HH:MM`
- README.md im Footer: `*Letzte Aktualisierung: yyyy-mm-dd HH:MM*`
- im Script ggf. vorhandene Versionsnummer hochzählen oder neue einfügen:
  - Patch (+0.0.1): Bugfixes, kleine Änderungen
  - Minor (+0.1.0): Neue Features, neue Spalten
  - Major (+1.0.0): Breaking Changes

## 🧠 Session & Memory

### Wichtig: Langzeitgedächtnis
`project-memory.md` (falls vorhanden) enthält Stack, Schnittstellen und Erkenntnisse aus vorherigen Sessions sowie einen fortlaufenden TO-DO-Block. Zu Session-Beginn lesen, zum Session-Ende pflegen.

### Wichtig: Dokumentations-Integrität
Neue und geänderte Funktionen oder ggf. genutzte Tabellen & Datenstrukturen in den jeweiligen o. g. *Dokumentationen* beschreiben. Nutze den Agent *Documentation Helper*, wenn es größere Anpassungen sind und er in diesem Projekt verfügbar ist.

### Session-Routinen
- **`/wake-up`**: Session-Start — holt das Projekt-Briefing vom Brain, liest `project-memory.md` und prüft Git-Status/Memory.
- **`/sleep`**: Session-Ende — Doku-Check, Wissen ins Brain sichern (Learnings, erledigte Tasks), `project-memory.md` und Memory pflegen, committen und pushen.

---

## Project Brain
Wissen und offene Tasks kommen über `/wake-up` (ruft `project-briefing` für `simple-consent-manager` ab).
Task erledigt: `/knowledge done <id>`
