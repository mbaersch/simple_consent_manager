/*******************************************************************************
 Simple Consent Manager
 Cookie-basiertes Consent Management f. Trackingcookies
 Version 0.11.1 vom 28.08.2026
 M. Baersch, gandke marketing & software gmbh - www.gandke.de
/*******************************************************************************/

/********************* SETUP **************************/
window.mgmcConfig = {
  //Anzahl der Monate f. Consent Cookie
  mgmcConsentCookieMonths : 12,

  //Version anpassen, wenn Consent neu eingeholt werden muss bei Aenderung des Umfangs
  mgmcConsentCookieVersion : 3,

  //Darstellungstyp. Optionen: overlay ("modal", zentriert), center, top, bottom
  mgmcConsentStyle          : "overlay",

  //optionale Fixierung per CSS (z. B. "100px" als Wert) vom oberen Rand
  //nur wirksam bei mgmcConsentStyle center bzw. overlay ("" = scrollbar)
  mgmcConsentStyleFixCenterPos : "200px",

  //Maximale Inhaltsbreite als CSS-Angabe bei "top" oder "bottom" als Stil
  mgmcConsentContentWidth : "600px",

  //Parameter zum Uebergehen der Abfrage bei (neuen) Besuchern ohne Consent-Auswahl
  //z. B. zum Abschalten der Abfrage auf Landingpages bei Paid Traffic.
  //Abschalten der automatischen Abfrage f. alle Seiten mit mgmcOverrideParam : '/';
  mgmcOverrideParam   : 'showconsentbanner=0',

  //Steuert, ob der Consent Manager auch einen ID-Key f. jeden Browser erzeugt, der zu Dokumentationszwecken
  //mit uebergeben bzw. abgerufen werden kann. Optionen: "never" (kein Key), "consent" (erst ab erster Auswahl
  //von Optionen), "always" (Cookie wird dann immer benoetigt)
  mgmcManageKey       : "consent",

  //Consent Ergebnis in den dataLayer ausgeben? Dann hier Eventnamen eintragen, sonst leer lassen
  mgmcDataLayerEvent  : "consent_ready",

  //Google Consent Mode anhand Gruppenconsent setzen?
  mgmcGcmEnabled      : true,

  //Microsoft Consent Mode anhand Gruppenconsent setzen?
  mgmcMscmEnabled     : true,

  //Microsoft Clarity Consent Mode anhand Gruppenconsent setzen?
  mgmcClcmEnabled     : true,

  //Welche Gruppe soll Marketing-Zustimmung im Consent Mode steuern?
  mgmcGrpAdvertising  : "2",

  //OPT-IN: 2-Layer-Architektur (First Layer mit kurzem Banner + Link auf Detail-Dialog).
  //Wenn false (Default): bisheriges Verhalten - alle Checkboxen und die Cookie-Tabelle
  //im einzigen Dialog. Wenn true: oid=0 zeigt einen schlanken First Layer; ueber den Link
  //"openSettings" oeffnet sich der Detail-Dialog (oid=2) mit Kategorie-Bloecken.
  mgmcUseTwoLayer     : false,

  //OPT-IN: Beim Erstellen des Banners einen <style>-Block in den Head injizieren, der
  //die Cookie-Tabelle (Spaltenbreiten, Padding, Sticky-Header), Kategorie-Bloecke und
  //den X-Button mit position:absolute layoutet. Sinnvoll, wenn die Site keine eigenen
  //Tabellen-Styles fuer das CMP mitbringt. Default false = unveraendertes Verhalten.
  mgmcInjectStyles    : false,

  //Basis-z-Index fuer das Overlay. Backdrop = mgmcZIndex - 1, innerer Wrapper = mgmcZIndex + 1.
  //Auf 99990 o. ae. erhoehen, falls die Seite einen sticky Header oder andere Stack-Contexte hat,
  //die das Banner sonst ueberlagern wuerden.
  mgmcZIndex          : 1000,

  //OPT-IN: Banner verzoegert einblenden. Statt sofort beim Load erscheint das Banner erst bei
  //der ersten Nutzer-Interaktion (Scroll/Wheel/Touch/Tastatur/Klick) und wird dabei sanft per
  //CSS-Keyframe (~1s) eingeblendet. Der erste Link-Klick wird einmalig abgefangen, damit das
  //Banner erscheint, bevor navigiert wird. Default false = unveraendertes Verhalten.
  mgmcDelayedReveal   : false,

  //OPT-IN: Auf schmalen Viewports (<=640px) das Banner am unteren Rand andocken statt an der
  //berechneten Desktop-Position (per injizierter Media-Query, unabhaengig von mgmcInjectStyles).
  //Default false = unveraendertes Verhalten.
  mgmcMobileBottom    : false,

  //UI-Konfiguration: Texte, Styles und Links zentral verwalten
  ui: {
    dialogTitle: "Nutzung von Cookies & Diensten",
    dialogIntro: "Diese Website nutzt Cookies. Einige sind <b>erforderlich</b> f&uuml;r den Betrieb der Website. Andere dienen der <b>Statistik</b> und helfen dabei, diese Website und ihre Funktionen zu verbessern. Ja genau: hier werden bei Zustimmung Clarity sowie (serverseitig) Google Analytics und Piwik PRO genutzt.",

    //Optional: eigene Texte fuer den First Layer (nur bei mgmcUseTwoLayer=true wirksam).
    //Fallback: dialogTitle/dialogIntro werden verwendet, wenn diese Felder leer/undefiniert sind.
    firstLayerTitle: "",
    firstLayerIntro: "",

    buttons: {
      minimal: "Nur Notwendige",
      acceptAll: "Cookies zulassen (Danke!)",
      saveSelection: "Auswahl speichern",
      activateAll: "Alle aktivieren",
      changeSelection: "Auswahl &auml;ndern",
      deleteSettings: "Einstellung l&ouml;schen",
      close: "Schlie&szlig;en",
      //Optional: Link-Text im First Layer (nur bei mgmcUseTwoLayer=true)
      openSettings: "Einstellungen anpassen"
    },
    buttonStyle: "text-decoration:none; display:inline-block; padding:6px 15px; border:1px solid #444; margin-right:1em; margin-bottom:10px; color:#333; background:#fff",
    okButtonStyle: "text-decoration:none; display:inline-block; padding:6px 15px; border:1px solid #444; margin-right:1em; margin-bottom:10px; color:#fff; background:#45650b",
    links: {
      privacy: "/datenschutz.html",
      imprint: "/impressum.html"
    }
  },


/********************* COOKIE INFO TABELLEN **************************/

  //Cookies, die immer aktiviert sein sollen.
  essentialCookies : {
    'title'         : 'Erforderlich',
    'description'   : 'Notwendig f&uuml;r den Betrieb der Website und Verwaltung der Zustimmung',
    'items' : [
      {
        'name'    : 'trk_consent',
        'domain'  : 'example.de',
        'desc'    : 'Speichert die Auswahl dieser Tracking-Zustimmungsabfrage.',
        'expires' : '1 Jahr',
        'type'    : 'Cookie'  //optional, Default ist "Cookie". Hier ggf. andere Speicherformen oder Tags deklarieren
      },
      {
        'name'    : 'PHPSESSID',
        'domain'  : 'example.de',
        'desc'    : 'F&uuml;r die Website erforderliche Kennung der akt. Sitzung. Wird automatisch vom Server gesetzt und ist als "Secure" und "httpOnly" gestaltet, so dass Scripts im Browser nicht darauf zugreifen k&ouml;nnen. L&auml;uft ab, wenn Browser geschlossen wird.',
        'expires' : 'Sitzung',
      }
    ]
  },

  //Cookies der Gruppe 1: Per Vorgabe die Gruppe f. Statistik / Tracking
  //Hinweis: Ueber "enableDefault" kann definiert werden, ob eine Gruppe ohne vorgenommene User -
  //Einstellungen per Default aktiv sein soll
  //Optional "dataLayerKey": Property-Name im consent_ready-Event (Default: "tracking" / "group2" / "group3")
  trackingCookies : {
    'enableDefault' : false,
    'title'        : 'Statistik',
    'description' : 'Erw&uuml;nscht f&uuml;r Webanalyse und Auswertung via MS Clarity',
    'marker'  : '1',
    'dataLayerKey' : 'tracking',
    'items' : [
      {
        'name'    : 'xxx',
        'domain'  : 'example.de',
        'desc'    : 'Speichert eine anonyme ID des Besuchers zur Auswertung der Websitenutzung in Google Analytics.',
        'expires' : '2 Jahre',
      },
    ]
  },

  //Cookies der optionalen Gruppe 2: Per Vorgabe die Gruppe f. Werbung
  //Bleibt inaktiv, wenn keine Items definiert wurden
  group2Cookies : {
    'enableDefault' : false,
    'title'        : 'Werbung',
    'description' : 'Cookies f&uuml;r Dienste mit Werbefunktionen wie Remarketing, Werbeerfolgskontrolle oder Interessen-Kategorisierung f&uuml;r relevantere Anzeigen.',
    'marker'  : '2',
    'dataLayerKey' : 'group2',
    'items' : [ ],
  },

  //Cookies der optionalen Gruppe 3: Per Vorgabe die Gruppe f. Externe Inhalte.
  //Bleibt inaktiv, wenn keine Items definiert wurden
  group3Cookies : {
    'enableDefault' : false,
    'title'        : 'Externe Inhalte',
    'description' : 'Cookies f&uuml;r eingebettete Medien; z. B. YouTube-Videos oder Inhalte aus Sozialen Medien.',
    'marker'  : '3',
    'dataLayerKey' : 'group3',
    'items' : [ ],
  },

  //Hier Funktionen definieren, die ggf. bei Erteilung bzw. Verweigerung des Consent aufgerufen werden sollen.
  //Hilfreich, wenn die aktive Seite z. B. bereits Tracking nach Consent senden soll. Im Zweifelsfall leer
  //lassen.
  consentCallback: function(ok) {
    if (ok === true) {
      //Hier optional Funktion fuer den Consent-Fall einfuegen.
      //z. B. Trackingaufruf oder Erneuern des Cookies via http gegen ITP
      //console.log(window._consentInfo);

    } else {
      //Hier optional Funktion fuer den Fall der Verweigerung einfuegen,
      //z. B. Cookie-Cleanup etc.
      //window.doAnalytics = false;
    }
  },

}

/********************* ENDE SETUP **************************/



function initConsent() {

  //Fuer Statusabfragen via getGroupConsent Cookiewerte lesen und global speichern
  getConsentCookie();

  if (!window.mgmcConfig.cmInitialized) {
    if (window.mgmcConfig.mgmcGcmEnabled === true) {
      window.dataLayer = window.dataLayer || [];
      if (!window.gtag) window.gtag = function(){dataLayer.push(arguments)};
      gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
      });
    }

    if (window.mgmcConfig.mgmcMscmEnabled === true) {
      window.uetq = window.uetq || [];
      window.uetq.push('consent', 'default', { 'ad_storage': 'denied' });
    }

    window.mgmcConfig.cmInitialized = true;

  }
  handleDataLayer();

  if ((window._consentInfo == "") &&
     (!window.mgmcConfig.mgmcOverrideParam || document.location.href.indexOf(window.mgmcConfig.mgmcOverrideParam) < 0))
    if ((document.location.pathname != window.mgmcConfig.ui.links.privacy) && (document.location.pathname != window.mgmcConfig.ui.links.imprint)) {
      if (window.mgmcConfig.mgmcDelayedReveal === true)
        //Verzoegert: Banner erst bei erster Interaktion einblenden (siehe armConsentReveal)
        armConsentReveal();
      else
        window.addEventListener("load", function (e) {showHideConsentBanner(0);});
    }
}

/**
 * OPT-IN (mgmcDelayedReveal): Zeigt das Consent-Banner verzoegert - erst bei der ersten
 * Nutzer-Interaktion (Scroll, Wheel, Touch, Tastatur oder Klick-Versuch). Ein Klick auf
 * einen Link wird beim ersten Mal abgefangen, damit das Banner sichtbar wird, bevor
 * navigiert wird. So bleibt der Above-the-fold-Bereich beim Reinkommen zunaechst frei.
 */
function armConsentReveal() {
  var armed = false;
  function reveal() {
    if (armed) return;
    armed = true;
    window.removeEventListener("scroll", reveal);
    window.removeEventListener("wheel", reveal);
    window.removeEventListener("touchstart", reveal);
    window.removeEventListener("keydown", reveal);
    document.removeEventListener("click", onClick, true);
    showHideConsentBanner(0);
  }
  function onClick(ev) {
    if (armed) return;
    var t = ev.target;
    var a = (t && t.closest) ? t.closest("a[href]") : null;
    if (a) { ev.preventDefault(); ev.stopPropagation(); }
    reveal();
  }
  window.addEventListener("scroll", reveal, { passive: true });
  window.addEventListener("wheel", reveal, { passive: true });
  window.addEventListener("touchstart", reveal, { passive: true });
  window.addEventListener("keydown", reveal);
  document.addEventListener("click", onClick, true);
}

function showConsentInfo() {
  showHideConsentBanner(1);
}

function resetConsentBanner() {
  var el = document.getElementById("consent-overlay");
  if (el) el.remove();
}

function getDomain() {
  var hostname = window.location.hostname;
  var parts = hostname.split('.').reverse();

  // Domains wie "localhost" oder IP-Adressen direkt zurueckgeben
  if (parts.length <= 1 || hostname.match(/^\d+\.\d+\.\d+\.\d+$/)) {
    return hostname;
  }

  // Sonderfaelle wie .co.uk, .gov.uk, etc.
  var commonTLDs = ['co.uk', 'gov.uk', 'ac.uk', 'org.uk', 'com.au', 'co.nz'];
  var root = parts[1] + '.' + parts[0];
  if (commonTLDs.indexOf(root) >= 0 && parts.length > 2) {
    return '.' + parts[2] + '.' + root;
  }

  return '.' + root;
}


function saveConsent(cnsArray) {

  function add2Consent(marker, dt, def_ts) {
    if (cnsArray.indexOf(marker) >= 0) {
      if (!dt || (dt == "")) dt = def_ts;
      return dt + ':'+marker+'|';
    } else return "";
  }

  if (cnsArray.length == 0) return;
  var allOff = cnsArray[0] === 0;
  if (allOff != true) {
    var today = new Date();
    var dd = ("0"+String(today.getDate())).slice(-2);
    var mm = ("0"+String(today.getMonth() + 1)).slice(-2);
    var yyyy = today.getFullYear();
    var ts = dd + '.' + mm + '.' + yyyy;
    var val = "";
    val += add2Consent(window.mgmcConfig.trackingCookies.marker,
                       window.mgmcTrackingConsentDate, ts);
    val += add2Consent(window.mgmcConfig.group2Cookies.marker,
                       window.mgmcGroup2ConsentDate, ts);
    val += add2Consent(window.mgmcConfig.group3Cookies.marker,
                       window.mgmcGroup3ConsentDate, ts);
  } else var val = '0|';

  //optionaler Key...
  if (window.mgmcConfig.mgmcManageKey != 'never') {
    if (!window.mgmcConsentKey) window.mgmcConsentKey = getNewConsentKey();
    val += window.mgmcConsentKey + ":CONSENT_KEY|";
  }

  //Version:
  val += window.mgmcConfig.mgmcConsentCookieVersion + ':ConVer|';

  var cExDate = new Date(+new Date() + 1000 * 60 * 60 * 24 * 30 * window.mgmcConfig.mgmcConsentCookieMonths);
  document.cookie = 'trk_consent=' + val + ';Expires=' +
    cExDate.toUTCString() + ';domain=' + getDomain() + ';path=/;SameSite=Lax;Secure';
  getConsentCookie();
  // Strikt vergleichen: bei "alles ablehnen" ist cnsArray[0] die Zahl 0, und
  // 0 != "" ergibt false — handleDataLayer() und der Callback blieben dann
  // aus, obwohl eine Entscheidung getroffen wurde. Nur der Reset-Aufruf
  // saveConsent([""]) soll den Block ueberspringen.
  if (cnsArray[0] !== "") {
    handleDataLayer();
    // Nicht gegen val pruefen: dort haengen oben schon Consent-Key und
    // Version dran, der Wert ist nie exakt '0|' und der Callback bekaeme
    // auch bei einer Ablehnung true.
    window.mgmcConfig.consentCallback(!allOff);
  }
}

function delConsentCookie() {
  document.cookie = "trk_consent=;max-age=0;domain=" + getDomain() + ";path=/;SameSite=Lax;Secure";
  getConsentCookie();
  handleDataLayer();
  window.mgmcConfig.consentCallback(false);
}

function getConsentCookie() {
  var value = 'trk_consent';
  var dc = document.cookie;
  var prefix = value + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) begin = -1;
  } else {
      begin += 2;
  }
  if (begin == -1) var rs = "";
  else {
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
        end = dc.length;
    }
    var rs = dc.substring(begin + prefix.length, end);
  }
  window._consentInfo = rs;

  window.mgmcConsentKey = null;
  if (window.mgmcConfig.mgmcManageKey != 'never') {
    var consents = window._consentInfo.split('|');
    consents.forEach(function(item) {
      if (item.indexOf(':CONSENT_KEY') >= 0) {
        window.mgmcConsentKey = item.slice(0, -12); return;
      }
    });

    if (!window.mgmcConsentKey && (window.mgmcConfig.mgmcManageKey === 'always')) {
      //ID vergeben und speichern
      window.mgmcConsentKey = getNewConsentKey();
      saveConsent([""]);
    }


    //Key und Version aus _consentInfo entfernen...
    window._consentInfo = window._consentInfo.replace(window.mgmcConsentKey+':CONSENT_KEY|', "");
  }

  //Version auslesen...
  window.mgmcConsentVersion = 0;
  var entries = window._consentInfo.split('|');
  entries.forEach(function(item) {
    if (item.indexOf(':ConVer') >= 0) {
      window.mgmcConsentVersion = item.slice(0, -7); return;
    }
  });
  //Info entfernen
  window._consentInfo = window._consentInfo.replace(window.mgmcConsentVersion+':ConVer|', "");
  //Version vergleichen
  if (window.mgmcConfig.mgmcConsentCookieVersion != window.mgmcConsentVersion)
    window._consentInfo = "";

  window.mgmcTrackingActive = getGroupConsent(window.mgmcConfig.trackingCookies.marker);
  window.mgmcGroup2Active   = getGroupConsent(window.mgmcConfig.group2Cookies.marker);
  window.mgmcGroup3Active   = getGroupConsent(window.mgmcConfig.group3Cookies.marker);
  window.mgmcTrackingConsentDate = getGroupConsentDate(window.mgmcConfig.trackingCookies.marker);
  window.mgmcGroup2ConsentDate = getGroupConsentDate(window.mgmcConfig.group2Cookies.marker);
  window.mgmcGroup3ConsentDate = getGroupConsentDate(window.mgmcConfig.group3Cookies.marker);

  return rs;
}


function getNewConsentKey() {
  var id = 'xxxx-xxxx-xxxx-xxxx'.replace(/x/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  return "CU"+id;
}

function getGroupConsent(marker) {
  if (!window._consentInfo || window._consentInfo == "") {
    if (marker == window.mgmcConfig.trackingCookies.marker) return window.mgmcConfig.trackingCookies.enableDefault;
    if (marker == window.mgmcConfig.group2Cookies.marker) return window.mgmcConfig.group2Cookies.enableDefault;
    if (marker == window.mgmcConfig.group3Cookies.marker) return window.mgmcConfig.group3Cookies.enableDefault;
  } else
    return window._consentInfo.indexOf(':'+marker.toString()) >= 0;
}

function handleDataLayer() {
  if (window.mgmcConfig.mgmcGcmEnabled || window.mgmcConfig.mgmcMscmEnabled || window.mgmcConfig.mgmcClcmEnabled) {
    var gcmAnalyticsConsent = getGroupConsent(window.mgmcConfig.trackingCookies.marker) ? "granted" : "denied",
        gcmAdsConsent = getGroupConsent(window.mgmcConfig.mgmcGrpAdvertising) ? "granted" : "denied";

    if (gcmAnalyticsConsent === "granted" || gcmAdsConsent === "granted") {

      if (window.mgmcConfig.mgmcGcmEnabled === true) {
        window.dataLayer = window.dataLayer || [];
        if (!window.gtag) window.gtag = function(){dataLayer.push(arguments)};
        gtag('consent', 'update', {
          'ad_storage': gcmAdsConsent,
          'ad_user_data': gcmAdsConsent,
          'ad_personalization': gcmAdsConsent,
          'analytics_storage': gcmAnalyticsConsent
        });
      }

      if (window.mgmcConfig.mgmcMscmEnabled === true) {
        window.uetq = window.uetq || [];
        window.uetq.push('consent', 'update', { 'ad_storage': gcmAdsConsent});
      }

      if (window.mgmcConfig.mgmcClcmEnabled === true || typeof(window.clarity) === "function") {
        window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};
        window.clarity('consentv2',{
          ad_Storage: gcmAdsConsent,
          analytics_Storage: gcmAnalyticsConsent
        });
      }
    }
  }

  if (window.mgmcConfig.mgmcDataLayerEvent && window.mgmcConfig.mgmcDataLayerEvent != "") {
    window.dataLayer = window.dataLayer || [];
    var trk = window.mgmcConfig.trackingCookies;
    var grp2 = window.mgmcConfig.group2Cookies;
    var grp3 = window.mgmcConfig.group3Cookies;
    var info = {};
    info[trk.dataLayerKey || "tracking"] = getGroupConsent(trk.marker);
    info[grp2.dataLayerKey || "group2"]  = getGroupConsent(grp2.marker);
    info[grp3.dataLayerKey || "group3"]  = getGroupConsent(grp3.marker);
    window.dataLayer.push({
      event: window.mgmcConfig.mgmcDataLayerEvent,
      consentInfo: info
    });
  }
}

function getGroupConsentDate(grp) {
  if (!window._consentInfo || window._consentInfo.indexOf(':'+grp.toString())<0) return "";
  var rs = ""
  var consents = window._consentInfo.split('|');
  consents.forEach(function(item) {
    if (item.indexOf(':'+grp.toString()) >= 0) {
      rs = item.substr(0,10); return;
    }
  });
  return rs;
}

function buildConsentChoice() {
  var consentChoice = [];
  var gp1 = document.getElementById('checkgrp1');
  var gp2 = document.getElementById('checkgrp2');
  var gp3 = document.getElementById('checkgrp3');
  if (gp1 && gp1.checked) consentChoice.push(window.mgmcConfig.trackingCookies.marker);
  if (gp2 && gp2.checked) consentChoice.push(window.mgmcConfig.group2Cookies.marker);
  if (gp3 && gp3.checked) consentChoice.push(window.mgmcConfig.group3Cookies.marker);
  if (consentChoice.length == 0) consentChoice.push(0);
  return consentChoice;
}

function buildConsentAll() {
  var consentChoice = [];
  if (window.mgmcConfig.trackingCookies.items.length > 0) consentChoice.push(window.mgmcConfig.trackingCookies.marker);
  if (window.mgmcConfig.group2Cookies.items.length > 0) consentChoice.push(window.mgmcConfig.group2Cookies.marker);
  if (window.mgmcConfig.group3Cookies.items.length > 0) consentChoice.push(window.mgmcConfig.group3Cookies.marker);
  return consentChoice;
}

//Optionaler Style-Block. Wird nur eingefuegt, wenn mgmcInjectStyles=true und noch nicht vorhanden.
//Layoutet die Cookie-Tabelle (Spaltenbreiten, Padding, Sticky-Header), Kategorie-Bloecke (Two-Layer)
//und den X-Button (position:absolute statt float:right).
function injectMgmcStyles() {
  if (document.getElementById('mgmc-styles')) return;
  var style = document.createElement('style');
  style.id = 'mgmc-styles';
  style.textContent =
    "#consent-olinner{box-shadow:0 8px 32px rgba(0,0,0,0.15);position:relative}"+
    "#consent-overlay h2{margin:0 0 0.5em 0;font-size:1.4em;padding-right:40px}"+
    "#consent-overlay h4{margin:0.8em 0 0.4em 0}"+
    "#consent-overlay p{margin:0.5em 0}"+
    ".mgmc-category{border-top:1px solid #ddd;padding:10px 0}"+
    ".mgmc-category label{cursor:pointer;user-select:none}"+
    ".mgmc-category input[type=checkbox]{vertical-align:middle;margin-right:6px}"+
    ".mgmc-tablediv{margin:12px 0 8px 0}"+
    "#mgmc-cookie-table{width:100%;border-collapse:collapse;table-layout:fixed;font-size:0.82em;margin-top:6px;background:#fff;border:1px solid #ddd}"+
    "#mgmc-cookie-table th,#mgmc-cookie-table td{padding:6px 8px;vertical-align:top;word-break:break-word;text-align:left}"+
    "#mgmc-cookie-table th{background:#eee;border-bottom:2px solid #ccc;font-weight:bold;position:sticky;top:0}"+
    "#mgmc-cookie-table td{border-bottom:1px solid #eee}"+
    "#mgmc-cookie-table td.mgmc-cookie-title{background:#f5f5f5;padding:10px 8px 6px 8px;border-top:2px solid #ccc;border-bottom:1px solid #ddd;font-size:1.05em}"+
    "#mgmc-cookie-table th:nth-child(1),#mgmc-cookie-table td:nth-child(1){width:16%;word-break:break-all}"+
    "#mgmc-cookie-table th:nth-child(2),#mgmc-cookie-table td:nth-child(2){width:17%;word-break:break-all}"+
    "#mgmc-cookie-table th:nth-child(3),#mgmc-cookie-table td:nth-child(3){width:40%}"+
    "#mgmc-cookie-table th:nth-child(4),#mgmc-cookie-table td:nth-child(4){width:15%}"+
    "#mgmc-cookie-table th:nth-child(5),#mgmc-cookie-table td:nth-child(5){width:12%}"+
    "#mgmc-cookie-table small{font-size:0.92em;display:inline-block;margin-top:4px}"+
    "#mgmc-cookie-table small a{word-break:break-all}"+
    "#mgmc-cookie-table code{background:#f5f5f5;padding:1px 4px;border-radius:3px;font-size:0.95em;font-family:monospace}"+
    ".mgmc-settings-link a{text-decoration:underline}"+
    ".mgmc-close-btn{position:absolute !important;top:14px;right:14px;cursor:pointer;z-index:5;display:inline-block !important;float:none !important;width:28px;height:28px;line-height:24px;text-align:center;padding:0 !important;margin:0 !important;font-size:0.9em;background:#fff !important;border:1px solid #e4e4e4 !important;border-radius:50% !important;color:#888 !important}"+
    ".mgmc-close-btn:hover{background:#f5f5f5 !important;color:#333 !important}";
  document.head.appendChild(style);
}

//Injiziert NUR die fuer mgmcDelayedReveal (Keyframe-Animationen) und mgmcMobileBottom
//(Media-Query) benoetigten Regeln - unabhaengig von mgmcInjectStyles, damit Fade-in und
//Mobil-Position auch ohne den grossen Tabellen-Style-Block funktionieren. Eigene <style>-ID,
//damit es nicht mit injectMgmcStyles kollidiert.
function injectMgmcRuntimeStyles() {
  if (document.getElementById('mgmc-runtime-styles')) return;
  var delayed = (window.mgmcConfig.mgmcDelayedReveal === true);
  var mobile  = (window.mgmcConfig.mgmcMobileBottom === true);
  if (!delayed && !mobile) return;
  var css = "";
  if (delayed) {
    //Sanftes Einblenden ueber CSS-Keyframe-Animationen (per Klasse 'mgmc-anim' aktiviert):
    //Banner faded, Box slidet, Dimmer faded. Animationen laufen zuverlaessig auch auf frisch
    //ins DOM eingefuegten Elementen (anders als opacity-Transitions).
    css +=
      "@keyframes mgmcFadeIn{from{opacity:0}to{opacity:1}}"+
      "@keyframes mgmcDimIn{from{opacity:0}to{opacity:0.8}}"+
      "@keyframes mgmcSlideIn{from{transform:translateY(16px)}to{transform:translateY(0)}}"+
      "#consent-overlay.mgmc-anim{animation:mgmcFadeIn 1s ease both}"+
      "#consent-overlay_vi.mgmc-anim{animation:mgmcDimIn 1s ease both}"+
      "#consent-overlay.mgmc-anim #consent-olinner{animation:mgmcSlideIn 1s ease both}";
  }
  if (mobile) {
    //Mobil (<=640px): Banner unten andocken statt an der berechneten Desktop-Position.
    //Ueberschreibt das overlay-Inline-CSS per !important; die JS-Positionierung fuer Desktop
    //bleibt unveraendert und greift nur per Media-Query auf kleinen Viewports.
    css +=
      "@media (max-width:640px){"+
        "#consent-fixoption{position:fixed !important;left:0 !important;right:0 !important;top:auto !important;bottom:0 !important;margin-top:0 !important;width:100% !important}"+
        "#consent-olinner{margin:0 !important;max-width:100% !important;max-height:85vh !important;border-left:0 !important;border-right:0 !important}"+
        "#consent-overlay .mgmc-dlg-padding{max-width:100% !important}"+
      "}";
  }
  var style = document.createElement('style');
  style.id = 'mgmc-runtime-styles';
  style.textContent = css;
  document.head.appendChild(style);
}

function showHideConsentBanner(oid) {

  if (window.mgmcConfig.mgmcInjectStyles === true) injectMgmcStyles();
  injectMgmcRuntimeStyles();

  function getRealPageHeight(){
    var test1 = document.body.scrollHeight;
    var test2 = document.body.offsetHeight
    if (test1 > test2) return test1; else return test2;
  }

  function arrayInfos2Table(cookieArray){
    var rs = "";
    if (cookieArray.items && (cookieArray.items.length > 0)) {
      rs = "<tr><td class='mgmc-cookie-title' colspan=5><b>"+cookieArray.title+"</b>: <small>"+cookieArray.description+"</small></td></tr>";
      cookieArray.items.forEach(function(item) {
        var tp = item.type;
        if (!tp || tp == "") tp = "Cookie";
        rs += "<tr><td>"+item.name+"</td><td>"+item.domain+"</td><td>"+item.desc+"</td><td>"+item.expires+"</td><td>"+tp+"</td></tr>";
      });
    }
    return rs;
  }

  function styleElement(xel) {
    xel.style.visibility = "hidden";
    xel.style.position = "absolute";
    xel.style.left = "0px";
    xel.style.top = "0px";
    xel.style.width = "100%";
    xel.style.height = "100%";
    xel.style.zIndex = window.mgmcConfig.mgmcZIndex || 1000;
    xel.style.textAlign = "center";
    return true ;
  }

  function getCheckedStatus(st, defaultChecked) {
    var rs = (st == "") ? "" : "checked";
    if ((rs == "") && (!window._consentInfo || (window._consentInfo == "")))
      if (defaultChecked == true) rs = "checked"
    return rs;
  }

  //Kategorie-Block fuer den Detail-Layer im Two-Layer-Modus.
  //Rendert Checkbox + bold Title + Beschreibung darunter.
  function buildCategoryBlock(cfgGroup, checkboxId, currentStatus, isEssential) {
    var checked = isEssential ? "checked disabled" : getCheckedStatus(currentStatus, cfgGroup.enableDefault);
    var labelStyle = isEssential
      ? "font-weight:bold;color:#666;padding-right:1em"
      : "font-weight:bold;padding-right:1em;cursor:pointer;user-select:none";
    var rs = "<div class='mgmc-category' style='border-top:1px solid #ddd;padding:10px 0'>";
    rs += "<div><input id='"+checkboxId+"' type='checkbox' "+checked+"> ";
    rs += "<label style='"+labelStyle+"' for='"+checkboxId+"'>"+cfgGroup.title+"</label></div>";
    rs += "<div style='margin:6px 0 0 24px;font-size:0.9em;color:#444'>"+cfgGroup.description+"</div>";
    rs += "</div>";
    return rs;
  }

  var el ;
  var dl ;

	el = document.getElementById("consent-overlay");
  if (el == null) {
    el = document.createElement('div');
    el.setAttribute('id','consent-overlay');
    styleElement(el);
    document.body.appendChild(el);
  }

  //Position bei jedem Einblenden setzen (nicht nur bei Erstellung)
  if (window.mgmcConfig.mgmcConsentStyle == 'top') {
    el.style.position = "fixed";
    el.style.height = "auto";
  } else if (window.mgmcConfig.mgmcConsentStyle == 'bottom') {
    el.style.position = "fixed";
    el.style.height = "auto";
    el.style.top = "unset";
    el.style.bottom = 0;
  } else {
    el.style.position = "absolute";
    el.style.height = "100%";
  }

  getConsentCookie();
  var trackingStatus = getGroupConsentDate(window.mgmcConfig.trackingCookies.marker);
  var group2Status = getGroupConsentDate(window.mgmcConfig.group2Cookies.marker);
  var group3Status = getGroupConsentDate(window.mgmcConfig.group3Cookies.marker);

  var ui = window.mgmcConfig.ui;
  var twoLayer = (window.mgmcConfig.mgmcUseTwoLayer === true);
  var hasMultiGroups = (window.mgmcConfig.group2Cookies.items && window.mgmcConfig.group2Cookies.items.length > 0) || (window.mgmcConfig.group3Cookies.items && window.mgmcConfig.group3Cookies.items.length > 0);

  var checkBoxes = "" ;

  //Klassische Inline-Checkboxen (Single-Layer-Modus / Detail im Two-Layer als Block-Variante separat)
  if (!twoLayer && hasMultiGroups) {
    checkBoxes = "<div class='mgmc-checkboxes' style='margin:8px 0'><input id='checkgrp0' type='checkbox' checked disabled> <label style='color:#aaa;padding-right:1.5em' for='checkgrp0'>" + window.mgmcConfig.essentialCookies.title + "</label>";
    checkBoxes += "  <input id='checkgrp1' type='checkbox' "+ getCheckedStatus(trackingStatus, window.mgmcConfig.trackingCookies.enableDefault) + "> <label style='user-select:none;padding-right:1.5em' for='checkgrp1'>" + window.mgmcConfig.trackingCookies.title + "</label>";
    if (window.mgmcConfig.group2Cookies.items && window.mgmcConfig.group2Cookies.items.length > 0)
      checkBoxes += "  <input id='checkgrp2' type='checkbox' "+getCheckedStatus(group2Status, window.mgmcConfig.group2Cookies.enableDefault) + "> <label style='user-select:none;padding-right:1.5em' for='checkgrp2'>" + window.mgmcConfig.group2Cookies.title + "</label>";
    if (window.mgmcConfig.group3Cookies.items && window.mgmcConfig.group3Cookies.items.length > 0)
      checkBoxes += "  <input id='checkgrp3' type='checkbox' "+getCheckedStatus(group3Status, window.mgmcConfig.group3Cookies.enableDefault) + "> <label style='user-select:none;padding-right:1.5em' for='checkgrp3'>" + window.mgmcConfig.group3Cookies.title + "</label>";
    checkBoxes += "</div>";
  }

  //Cookie-Detailtabelle (alle Modi gleich)
  var CookieInfoTable = "<div class='mgmc-tablediv' style='margin:8px 0'><span id='mgmc-tblink'>&#9660; <a href='#' style='color:#444;font-size:0.9em'  onclick='document.getElementById(\"mgmc-cookie-table\").style.display=\"block\";document.getElementById(\"mgmc-tblink-close\").style.display=\"inline\";document.getElementById(\"mgmc-tblink\").style.display=\"none\";return false'>Cookie-Details anzeigen</a></span>";
  CookieInfoTable += "<table style='background:#fff;max-height:400px; overflow-y:auto; display:none' id='mgmc-cookie-table'><tr><th>Cookie</th><th>Anbieter</th><th>Info</th><th>Ablauf</th><th>Typ</th></tr>";
  CookieInfoTable += arrayInfos2Table(window.mgmcConfig.essentialCookies);
  CookieInfoTable += arrayInfos2Table(window.mgmcConfig.trackingCookies);
  CookieInfoTable += arrayInfos2Table(window.mgmcConfig.group2Cookies);
  CookieInfoTable += arrayInfos2Table(window.mgmcConfig.group3Cookies);
  CookieInfoTable += "</table><span id='mgmc-tblink-close' style='display:none'>&#9650; <a href='#' style='color:#444;font-size:0.9em'  onclick='document.getElementById(\"mgmc-cookie-table\").style.display=\"none\";document.getElementById(\"mgmc-tblink\").style.display=\"initial\";document.getElementById(\"mgmc-tblink-close\").style.display=\"none\";return false'> 	Cookie-Details ausblenden</a></span></div>";

  //Footer (alle Modi gleich)
  var footerText = "<div id=\"consent-footer\" style=\"clear:both;margin-top:1em; text-align:center;font-size:0.9em;border-top:1px solid #ccc; padding-top:1em\"><a style=\"color:#666;text-decoration:none\" href=\""+ui.links.privacy+"\">Datenschutz</a> | <a style=\"color:#666;text-decoration:none\" href=\""+ui.links.imprint+"\">Impressum</a></div>" ;

  //Schliessen-Button: bei Style-Inject ohne Inline-Style (CSS uebernimmt position:absolute),
  //sonst klassisch float:right inline (alte Optik).
  var closeBtn;
  if (window.mgmcConfig.mgmcInjectStyles === true) {
    closeBtn = "<a class='mgmc-close-btn' onclick=\"showHideConsentBanner("+oid+"); return false;\" href=\"#\">X</a>";
  } else {
    closeBtn = "<a class='mgmc-close-btn' style=\"color:#aaa;float:right;text-decoration:none;margin:10px;background:#fff;border-radius: 50%;padding:3px 12px;border:1px solid #e4e4e4\" onclick=\"showHideConsentBanner("+oid+"); return false;\" href=\"#\">X</a>";
  }

  //Wrapper bauen
  var teaserText = (['overlay', 'center'].indexOf(window.mgmcConfig.mgmcConsentStyle)<0) ? closeBtn : "";
  teaserText += "<div id='consent-fixoption'";
  if ((window.mgmcConfig.mgmcConsentStyleFixCenterPos != "") && (['overlay', 'center'].indexOf(window.mgmcConfig.mgmcConsentStyle)>=0)) teaserText += "style='position: fixed;text-align:center;width:100%;margin-top:"+window.mgmcConfig.mgmcConsentStyleFixCenterPos+"'";
  var olinnerZ = (window.mgmcConfig.mgmcZIndex || 1000) + 1;
  var olinnerExtra = twoLayer ? "; max-height:calc(100vh - 80px); overflow-y:auto" : "";
  teaserText += "><div id=\"consent-olinner\" style=\"max-width:"+window.mgmcConfig.mgmcConsentContentWidth+olinnerExtra+"; margin:100px auto; background:rgb(242,242,242); background:linear-gradient(150deg, rgba(255,255,255,1) 0%, rgba(250,250,250,1) 35%, rgba(242,242,242,1) 100%); border:1px solid #ccc; text-align:left; z-index: "+olinnerZ+"\">";
  if (['overlay', 'center'].indexOf(window.mgmcConfig.mgmcConsentStyle)>=0)
    teaserText += closeBtn;
  teaserText += "<div class='mgmc-dlg-padding' style=\"padding:20px 20px 10px 20px;margin:0 auto; max-width:"+window.mgmcConfig.mgmcConsentContentWidth+";\">" ;

  // ----- Layer-spezifischer Inhalt -----
  var pp_txt = "";
  var actualTitle = ui.dialogTitle;

  if (twoLayer && oid == 0) {
    // First Layer: schlanker Banner mit Link auf Detail-Layer
    actualTitle = ui.firstLayerTitle || ui.dialogTitle;
    var firstIntro = ui.firstLayerIntro || ui.dialogIntro;
    var settingsLink = "<div class='mgmc-settings-link' style='margin:1em 0 0.5em 0'><a href='#' style='color:#444;font-size:0.95em' onclick='showHideConsentBanner(0); showHideConsentBanner(2); return false;'>"+ui.buttons.openSettings+"</a></div>";
    var firstLayerButtons = "<p style='margin-top:1em;text-align:right'>"+
      "<a style='"+ui.buttonStyle+"' href='#' class=\"noconsentlink\" onclick='saveConsent([0]); showHideConsentBanner(0); return false;'>"+ui.buttons.minimal+"</a>"+
      " <a style='"+ui.okButtonStyle+"' href='#' class=\"consentlink\" onclick='saveConsent(buildConsentAll()); showHideConsentBanner(0); return false;'>"+ui.buttons.acceptAll+"</a>"+
    "</p>";
    pp_txt = "<p style='margin:0.5em 0 1em 0'>"+firstIntro+"</p>" + settingsLink + firstLayerButtons + footerText;
  }
  else if (twoLayer && oid == 2) {
    // Detail-Layer im Two-Layer-Modus: Kategorie-Bloecke + Cookie-Tabelle
    actualTitle = ui.dialogTitle;
    var categoryBlocks = "<div class='mgmc-categories' style='margin:1em 0'>";
    categoryBlocks += buildCategoryBlock(window.mgmcConfig.essentialCookies, 'checkgrp0', '', true);
    categoryBlocks += buildCategoryBlock(window.mgmcConfig.trackingCookies, 'checkgrp1', trackingStatus, false);
    if (window.mgmcConfig.group2Cookies.items && window.mgmcConfig.group2Cookies.items.length > 0)
      categoryBlocks += buildCategoryBlock(window.mgmcConfig.group2Cookies, 'checkgrp2', group2Status, false);
    if (window.mgmcConfig.group3Cookies.items && window.mgmcConfig.group3Cookies.items.length > 0)
      categoryBlocks += buildCategoryBlock(window.mgmcConfig.group3Cookies, 'checkgrp3', group3Status, false);
    categoryBlocks += "</div>";

    var twoLayerButtons = "<p style='margin-top:1em;text-align:right'>"+
      "<a style='"+ui.buttonStyle+"' href='#' class=\"noconsentlink\" onclick='saveConsent([0]); showHideConsentBanner(2); return false;'>"+ui.buttons.minimal+"</a>"+
      " <a style='"+ui.buttonStyle+"' href='#' class=\"noconsentlink\" onclick='saveConsent(buildConsentChoice()); showHideConsentBanner(2); return false;'>"+ui.buttons.saveSelection+"</a>"+
      " <a style='"+ui.okButtonStyle+"' href='#' class=\"consentlink\" onclick='saveConsent(buildConsentAll()); showHideConsentBanner(2); return false;'>"+ui.buttons.activateAll+"</a>"+
    "</p>";
    pp_txt = "<p style='margin:0.5em 0'>"+ui.dialogIntro+"</p>" + categoryBlocks + CookieInfoTable + twoLayerButtons + footerText;
  }
  else if (oid == 1) {
    // Re-open Settings (gleich in beiden Modi)
    actualTitle = ui.dialogTitle;

    var consentInfoText = '<h4>Aktuelle Auswahl</h4>';
    if (!window._consentInfo || (window._consentInfo == "")) {
      consentInfoText += 'Es wurde keine Auswahl gespeichert.';
      consentInfoText += "<p class='mgmc-dlg-status'>";
      if ((window.mgmcConfig.trackingCookies.items.length > 0) && window.mgmcConfig.trackingCookies.enableDefault != true)
        consentInfoText += '<span style="color:red">'+window.mgmcConfig.trackingCookies.title+'-Cookies werden blockiert</span><br />';
      if ((window.mgmcConfig.group2Cookies.items.length > 0) && window.mgmcConfig.group2Cookies.enableDefault != true)
        consentInfoText += '<span style="color:red">'+window.mgmcConfig.group2Cookies.title+'-Cookies werden blockiert</span><br />';
      if ((window.mgmcConfig.group3Cookies.items.length > 0) && window.mgmcConfig.group3Cookies.enableDefault != true)
        consentInfoText += '<span style="color:red">'+window.mgmcConfig.group3Cookies.title+'-Cookies werden blockiert</span>';
      consentInfoText += '</p>';
    } else if (window._consentInfo == '0|') consentInfoText += 'Es werden auf Wunsch nur notwendige Cookies genutzt. <span style="color:red">Cookies anderer Funktionen sind deaktiviert</span>.';
    else {
      consentInfoText += '<p>';
      if (trackingStatus != "")
        consentInfoText += '<span style="color:green">'+window.mgmcConfig.trackingCookies.title+'-Cookies aktiv</span>. Die Auswahl wurde <b>am '+trackingStatus+'</b> gespeichert.<br />';
      if (group2Status != "")
        consentInfoText += '<span style="color:green">'+window.mgmcConfig.group2Cookies.title+'-Cookies aktiv</span>. Die Auswahl wurde <b>am '+group2Status+'</b> gespeichert.<br />';
      if (group3Status != "")
        consentInfoText += '<span style="color:green">'+window.mgmcConfig.group3Cookies.title+'-Cookies aktiv</span>. Die Auswahl wurde <b>am '+group3Status+'</b> gespeichert.';
      consentInfoText += '</p>';
    }

    //"Auswahl aendern" oeffnet je nach Modus den Detail-Layer (oid=2) oder den Single-Layer (oid=0)
    var changeTarget = twoLayer ? 2 : 0;
    var delBtn = ((window._consentInfo != null) && (window._consentInfo != '')) ? "<a style='"+ui.buttonStyle+"' href='#' onclick='showHideConsentBanner(1); delConsentCookie(); return false;'>"+ui.buttons.deleteSettings+"</a>" : "";
    var orgBtnText = "<p style='margin-top:1em;text-align:right'>"+delBtn+"<a style='"+ui.buttonStyle+"' href='#' onclick='showHideConsentBanner(1); showHideConsentBanner("+changeTarget+"); return false;'>"+ui.buttons.changeSelection+"</a> <a style='"+ui.buttonStyle+"' href='#' onclick='showHideConsentBanner(1); return false;'>"+ui.buttons.close+"</a></p><div style=\"clear:both\"></div>";

    pp_txt = ui.dialogIntro + consentInfoText + CookieInfoTable + orgBtnText;
  }
  else {
    // Single-Layer-Modus (mgmcUseTwoLayer=false), oid==0 (oder unbekannt)
    actualTitle = ui.dialogTitle;
    var buttonsText = "<p style='margin-top:1em;float:right'><a style='"+ui.buttonStyle+"' href='#' class=\"noconsentlink\" onclick='saveConsent([0]); showHideConsentBanner("+oid+");return false;'>"+ui.buttons.minimal+"</a>";

    if (hasMultiGroups) {
      buttonsText += " <a style='"+ui.buttonStyle+"' href='#' class=\"noconsentlink\" onclick='saveConsent(buildConsentChoice()); "+
                     "showHideConsentBanner("+oid+"); return false;'>"+ui.buttons.saveSelection+"</a>";
      buttonsText += " <a style='"+ui.okButtonStyle+"' href='#' class=\"consentlink\" onclick='saveConsent(buildConsentAll()); "+
                     "showHideConsentBanner("+oid+"); return false;'>"+ui.buttons.activateAll+"</a></p>";
    } else {
      buttonsText += " <a style='"+ui.okButtonStyle+"' href='#' class=\"consentlink\" onclick='saveConsent([\""+window.mgmcConfig.trackingCookies.marker+"\"]); "+
                     "showHideConsentBanner("+oid+"); return false;'>"+ui.buttons.acceptAll+"</a></p>";
    }

    pp_txt = ui.dialogIntro + checkBoxes + CookieInfoTable + buttonsText + footerText;
  }

  teaserText += "<h2>"+actualTitle+"</h2>\n";
  teaserText += pp_txt + "</div></div>\n";

  el.innerHTML = teaserText;

  dl = document.getElementById("consent-overlay_vi");
  if (dl == null) {
    dl = document.createElement('div');
    dl.setAttribute('id','consent-overlay_vi');
    styleElement(dl);
    dl.style.background = "#222";
    dl.style.opacity = "0.8";
    dl.style.zIndex = (window.mgmcConfig.mgmcZIndex || 1000) - 1;
    document.body.appendChild(dl);
  }

  //zentrieren bzw. an ConsentStyle anpassen...
  var ovli = document.getElementById("consent-olinner");
  if (ovli) {
    if (window.mgmcConfig.mgmcConsentStyle != 'overlay') ovli.style.boxShadow = "#000 0 0 10px";
    if ((window.mgmcConfig.mgmcConsentStyle == 'top') || (window.mgmcConfig.mgmcConsentStyle == 'bottom')) {
      ovli.style.maxWidth = "initial";
      ovli.style.margin = "0 auto";
      ovli.style.borderLeft = "0";
      ovli.style.borderRight = "0";
    } else {
      if (window.mgmcConfig.mgmcConsentStyleFixCenterPos != "")
        ovli.style.marginTop = "0";
      else {
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        top += 100 ;
        if (top > 100) ovli.style.marginTop = top.toString()+"px" ;
      }
    }
  }

  var ovZeigen = (el.style.visibility == "visible") ? "hidden" : "visible";
  if (ovZeigen === 'visible') {
    dl.style.height = getRealPageHeight()+'px';
  } ;
  var dimZeigen = (window.mgmcConfig.mgmcConsentStyle == 'overlay') ? ovZeigen : 'hidden';

  if (window.mgmcConfig.mgmcDelayedReveal === true && ovZeigen === 'visible') {
    //OPT-IN Fade-in (~1s) via Keyframe-Klasse 'mgmc-anim': Klasse entfernen, Reflow erzwingen,
    //neu setzen, damit die Animation auch bei wiederholtem Oeffnen (Re-Open) erneut laeuft.
    el.classList.remove('mgmc-anim');
    dl.classList.remove('mgmc-anim');
    void el.offsetWidth;
    el.style.visibility = 'visible';
    el.classList.add('mgmc-anim');
    if (dimZeigen === 'visible') {
      dl.style.opacity = '0.8';
      dl.style.visibility = 'visible';
      dl.classList.add('mgmc-anim');
    } else {
      dl.style.visibility = 'hidden';
    }
  } else {
    dl.style.visibility = dimZeigen;
    el.style.visibility = ovZeigen;
    if (window.mgmcConfig.mgmcDelayedReveal === true) {
      el.classList.remove('mgmc-anim');
      dl.classList.remove('mgmc-anim');
    }
  }
  return (ovZeigen === 'visible') ;
}
