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

## 🧠 Session & Memory Manager

### Wichtig: Langzeitgedächtnis
Bei **jedem Start** in diesem Projekt (unabhängig vom unten beschriebenen `sessionstart` Kommando):
→ Lies die Datei `project-memory.md`, falls sie existiert. Sie enthält wichtige Erkenntnisse aus vorherigen Sessions.

### Wichtig: Dokumentations-Integrität
Neue und geänderte Funktionen oder ggf. genutzte Tabellen & Datenstrukturen in den jeweiligen o. g. *Dokumentationen* beschreiben. Nutze den Agent *Documentation Helper*, wenn es größere Anpassungen sind und er in diesem Projekt verfügbar ist.

### Session State
- **Status:** [IDLE]
- **Current Session Start:** [ - ]
- **Total Project Duration:** 0h 6m

### 🤖 Automation Triggers

#### 🟢 Trigger: `sessionstart`
**Wenn der User "sessionstart" eingibt:**
**Check (diese Datei):**
1.  * Wenn **Status** im Abschnitt *Session State* bereits [ACTIVE] ist (und Startzeit < 12h her), warne den User und frage, ob eine neue Session gestartet werden soll. Wenn nicht, ändere nichts am *Session State*. 
    * Wenn Startzeit > 12h her (vergessener Logout) oder User oben bestätigt hat, eine neue Zeit einzutragen, setze zurück, starte neu und vermerke dies kurz in der Bestätigungsnachricht.
2.  **Action:**
    * Setze **Status** im Abschnitt *Session State* auf `[ACTIVE]`.
    * Trage die aktuelle lokale Systemzeit (yyyy-mm-dd HH:MM:SS) in **Current Session Start** ein.

**Logging (in `session_log.md`):**
1.  **Dateiprüfung:** Prüfe, ob die Datei `session_log.md` existiert. Falls nein, erstelle sie mit diesem Header: `| Start | End | Duration |`. Lies die Datei, wenn sie existiert.
2.  **Action:**
    * Trage eine neue Zeile in `session_log.md` mit der aktuellen Systemzeit Format (yyyy-mm-dd HH:MM:SS) unter *Start* in die Tabelle `session_log.md` ein.

**Response:**
1.  **In der Response:**
    * Gib aus: "⏱️ **Session gestartet.** Tracking läuft ab [Zeit]."
    * Zeige zur Kontrolle die maximal letzten 3 Zeilen der Tabelle (Header erhalten) aus `session_log.md` und zeige sie ebenfalls an. Die neu eingetragene Zeile sollte dabei sein, die nur eine Startseit enthält.

#### 🔴 Trigger: `sessionend`
**Wenn der User "sessionend" eingibt, führe diese Sequenz aus:**
1.  **Zeit:** Berechne Dauer basierend auf **Current Session Start** dieser Datei und Jetzt.
2.  **Wissen (in `project-memory.md`):**
    * Lies die Datei `project-memory.md`, wenn sie existiert.
    * Analysiere den Chatverlauf dieser Session auf neue Erkenntnisse/Regeln.
    * Aktualisiere den Inhalt von `project-memory.md` (füge Neues hinzu, lösche Veraltetes) oder lege den Inhalt neu an, wenn die Datei vorger nicht existierte. Decke dabei Infos zum Stack ab, Schnittstellen und alles, was nicht direkt aus dem Code oder dieser `CLAUDE.md` hervorgeht. Führe einen fortlaufenden *TO DO* Block, der für die nächste Session direkt Hinweise zur Fortführung evtl. unvollständiger Pläne o. Ä. enthält.   
    * **Schreibe die Änderungen in `project-memory.md`.**
3.  **Log (in `session_log.md`):**
    * Lies `session_log.md`. Sie sollte existieren. Wenn das nicht der Fall ist, lege sie wie beim Kommando "sessionstart" beschrieben an und weise auf das Fehlen in der Response hin. 
    * Neue Zeile berechnen: Verwende die (wenn sie vorhanden war) letzte Zeile mit dem schon vorhandenen Startdatum. Ist die Datei `session_log.md` neu angelegt, verwende das Startdatum aus dieser Datei unter **Current Session Start:**. *End* in der neuen Zeile wird der aktuelle Zeitstempel (yyyy-mm-dd HH:MM:SS). Berrechne die *Duration* in Stunden aus *Start* und *End*, Format für das Log ist HH:MM:SS.
    * **Schreibe die neue Zeile in die Datei `session_log.md`.**
4.  **Reset (Diese Datei):**
    * Setze hier **Status** auf `[IDLE]` und Startzeit auf `[ - ]`.
    * Addiere Dauer zu **Total Project Duration**.
5.  **Response:**
    * "✅ **Session beendet & Log geschrieben**, bereit für */clear* oder */exit.*"
    * Zeige die neu geschriebene Zeile für `session_log.md` an.
    * Bestätige: "Langzeitgedächtnis aktualisiert in `project-memory.md`."
    * Frage nach, ob zu clasp und / oder git gepushed werden soll, wenn dies nicht nach der letzten Anpassung bereits auf Nachfrage geschehen ist."

---
