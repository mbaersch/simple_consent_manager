    if (window.mgmcConfig.mgmcGcmEnabled === true) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(['consent', 'update', {
        'ad_storage': gcmAdsConsent,
        'ad_user_data': gcmAdsConsent,
        'ad_personalization': gcmAdsConsent,
        'analytics_storage': gcmAnalyticsConsent
      }]);
    }
/*******************************************************************************
 Simple Consent Manager
 Cookie-basiertes Consent Management f. Trackingcookies
 Version 0.9.8 vom 29.01.2026
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

  //UI-Konfiguration: Texte, Styles und Links zentral verwalten
  ui: {
    dialogTitle: "Nutzung von Cookies & Diensten",
    dialogIntro: "Diese Website nutzt Cookies. Einige sind <b>erforderlich</b> f&uuml;r den Betrieb der Website. Andere dienen der <b>Statistik</b> und helfen dabei, diese Website und ihre Funktionen zu verbessern. Ja genau: hier werden bei Zustimmung Clarity sowie (serverseitig) Google Analytics und Piwik PRO genutzt.",
    buttons: {
      minimal: "Nur Notwendige",
      acceptAll: "Cookies zulassen (Danke!)",
      saveSelection: "Auswahl speichern",
      activateAll: "Alle aktivieren",
      changeSelection: "Auswahl &auml;ndern",
      deleteSettings: "Einstellung l&ouml;schen",
      close: "Schlie&szlig;en"
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
  trackingCookies : {
    'enableDefault' : false, 
    'title'        : 'Statistik', 
    'description' : 'Erw&uuml;nscht f&uuml;r Webanalyse und Auswertung via MS Clarity',
    'marker'  : '1', 
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
    'items' : [ ],  
  },
  
  //Cookies der optionalen Gruppe 3: Per Vorgabe die Gruppe f. Externe Inhalte. 
  //Bleibt inaktiv, wenn keine Items definiert wurden
  group3Cookies : {
    'title'        : 'Externe Inhalte', 
    'description' : 'Cookies f&uuml;r eingebettete Medien; z. B. YouTube-Videos oder Inhalte aus Sozialen Medien.',
    'marker'  : '3', 
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
    if ((document.location.pathname != window.mgmcConfig.ui.links.privacy) && (document.location.pathname != window.mgmcConfig.ui.links.imprint))
      window.addEventListener("load", function (e) {showHideConsentBanner(0);});
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
    cExDate.toGMTString() + ';domain=' + getDomain() + ';path=/';
  getConsentCookie();  
  if (cnsArray[0] != "") {
    handleDataLayer(); 
    window.mgmcConfig.consentCallback(val != '0|');
  } 
}

function delConsentCookie() {
  document.cookie = "trk_consent=;max-age=0;domain=" + getDomain() + ";path=/;";
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

function handleDataLayer(mrk) {
  console.log(mrk);
  if (window.mgmcConfig.mgmcGcmEnabled || window.mgmcConfig.mgmcMscmEnabled || window.mgmcConfig.mgmcClcmEnabled) {
    var gcmAnalyticsConsent = getGroupConsent(1) ? "granted" : "denied",
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
    window.dataLayer.push({
      event: window.mgmcConfig.mgmcDataLayerEvent,
      consentInfo: {
        tracking: getGroupConsent(1),
        group2: getGroupConsent(2),
        group3: getGroupConsent(3)
      }
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
  var gp2 = document.getElementById('checkgrp2');
  var gp3 = document.getElementById('checkgrp3');
  if (document.getElementById('checkgrp1').checked) consentChoice.push(window.mgmcConfig.trackingCookies.marker);
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

function showHideConsentBanner(oid) {

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
    xel.style.zIndex = "1000"; 
    xel.style.textAlign = "center";
    return true ;
  }  
  
  function getCheckedStatus(st, defaultChecked) {
    var rs = (st == "") ? "" : "checked";
    if ((rs == "") && (!window._consentInfo || (window._consentInfo == "")))
      if (defaultChecked == true) rs = "checked" 
    return rs;
  }
    
  var el ;
  var dl ;

	el = document.getElementById("consent-overlay");
  if (el == null) {
    el = document.createElement('div');
    el.setAttribute('id','consent-overlay');
    styleElement(el);
    
    //style anpassen...
    if (window.mgmcConfig.mgmcConsentStyle != 'overlay')
      el.style.height = "auto";
    if (window.mgmcConfig.mgmcConsentStyle == 'top')
      el.style.position = "fixed";
    else if (window.mgmcConfig.mgmcConsentStyle == 'bottom') {
      el.style.position = "fixed";
      el.style.top = "unset";
      el.style.bottom = 0;
    }
    document.body.appendChild(el);
  }
  
  getConsentCookie();
  var trackingStatus = getGroupConsentDate(window.mgmcConfig.trackingCookies.marker);
  var group2Status = getGroupConsentDate(window.mgmcConfig.group2Cookies.marker);
  var group3Status = getGroupConsentDate(window.mgmcConfig.group3Cookies.marker);

  var checkBoxes = "" ;
  var hasMultiGroups = (window.mgmcConfig.group2Cookies.items && window.mgmcConfig.group2Cookies.items.length > 0) || (window.mgmcConfig.group3Cookies.items && window.mgmcConfig.group3Cookies.items.length > 0);
  
  //Mehr als nur die Gruppe zum Tracking? Dann Checkboxen und Status ausgeben...
  if (hasMultiGroups) {
    checkBoxes = "<div class='mgmc-checkboxes' style='margin:8px 0'><input id='checkgrp0' type='checkbox' checked disabled> <label style='color:#aaa;padding-right:1.5em' for='checkgrp0'>" + window.mgmcConfig.essentialCookies.title + "</label>";
    checkBoxes += "  <input id='checkgrp1' type='checkbox' "+ getCheckedStatus(trackingStatus, window.mgmcConfig.trackingCookies.enableDefault) + "> <label style='user-select:none;padding-right:1.5em' for='checkgrp1'>" + window.mgmcConfig.trackingCookies.title + "</label>";
    if (window.mgmcConfig.group2Cookies.items && window.mgmcConfig.group2Cookies.items.length > 0)
      checkBoxes += "  <input id='checkgrp2' type='checkbox' "+getCheckedStatus(group2Status, window.mgmcConfig.group2Cookies.enableDefault) + "> <label style='user-select:none;padding-right:1.5em' for='checkgrp2'>" + window.mgmcConfig.group2Cookies.title + "</label>";
    if (window.mgmcConfig.group3Cookies.items && window.mgmcConfig.group3Cookies.items.length > 0)
      checkBoxes += "  <input id='checkgrp3' type='checkbox' "+getCheckedStatus(group3Status, window.mgmcConfig.group3Cookies.enableDefault) + "> <label style='user-select:none;padding-right:1.5em' for='checkgrp3'>" + window.mgmcConfig.group3Cookies.title + "</label>";
    checkBoxes += "</div>";
  }
  
  var ui = window.mgmcConfig.ui;
  var buttonsText = "<p style='margin-top:1em;float:right'><a style='"+ui.buttonStyle+"' href='#' class=\"noconsentlink\" onclick='saveConsent([0]); showHideConsentBanner("+oid+");return false;'>"+ui.buttons.minimal+"</a>";

  if (hasMultiGroups) {
    //Button zum Speichern der Auswahl oder alle
    buttonsText += " <a style='"+ui.buttonStyle+"' href='#' class=\"noconsentlink\" onclick='saveConsent(buildConsentChoice()); "+
                   "showHideConsentBanner("+oid+"); return false;'>"+ui.buttons.saveSelection+"</a>";
    buttonsText += " <a style='"+ui.okButtonStyle+"' href='#' class=\"consentlink\" onclick='saveConsent(buildConsentAll()); "+
                   "showHideConsentBanner("+oid+"); return false;'>"+ui.buttons.activateAll+"</a></p>";
  } else {
    //simple Variante ohne Checkboxen
    buttonsText += " <a style='"+ui.okButtonStyle+"' href='#' class=\"consentlink\" onclick='saveConsent([\""+window.mgmcConfig.trackingCookies.marker+"\"]); "+
                   "showHideConsentBanner("+oid+"); return false;'>"+ui.buttons.acceptAll+"</a></p>";
  }                 

  var CookieInfoTable = "<div class='mgmc-tablediv' style='margin:8px 0'><span id='mgmc-tblink'>&#9660; <a href='#' style='color:#444;font-size:0.9em'  onclick='document.getElementById(\"mgmc-cookie-table\").style.display=\"block\";document.getElementById(\"mgmc-tblink-close\").style.display=\"inline\";document.getElementById(\"mgmc-tblink\").style.display=\"none\";return false'>Cookie-Details anzeigen</a></span>";
  CookieInfoTable += "<table style='background:#fff;max-height:400px; overflow-y:auto; display:none' id='mgmc-cookie-table'><tr><th>Cookie</th><th>Anbieter</th><th>Info</th><th>Ablauf</th><th>Typ</th></tr>";

  CookieInfoTable += arrayInfos2Table(window.mgmcConfig.essentialCookies);
  CookieInfoTable += arrayInfos2Table(window.mgmcConfig.trackingCookies);
  CookieInfoTable += arrayInfos2Table(window.mgmcConfig.group2Cookies);
  CookieInfoTable += arrayInfos2Table(window.mgmcConfig.group3Cookies);

  CookieInfoTable += "</table><span id='mgmc-tblink-close' style='display:none'>&#9650; <a href='#' style='color:#444;font-size:0.9em'  onclick='document.getElementById(\"mgmc-cookie-table\").style.display=\"none\";document.getElementById(\"mgmc-tblink\").style.display=\"initial\";document.getElementById(\"mgmc-tblink-close\").style.display=\"none\";return false'> 	Cookie-Details ausblenden</a></span></div>";
  
  var footerText = "<div id=\"consent-footer\" style=\"clear:both;margin-top:1em; text-align:center;font-size:0.9em;border-top:1px solid #ccc; padding-top:1em\"><a style=\"color:#666;text-decoration:none\" href=\""+ui.links.privacy+"\">Datenschutz</a> | <a style=\"color:#666;text-decoration:none\" href=\""+ui.links.imprint+"\">Impressum</a></div>" ; 
  
  var closeBtn = "<a class='mgmc-close-btn' style=\"color:#aaa;float:right;text-decoration:none;margin:10px;background:#fff;border-radius: 50%;padding:3px 12px;border:1px solid #e4e4e4\" onclick=\"showHideConsentBanner("+oid+"); return false;\" href=\"#\">X</a>";

  var teaserText = (['overlay', 'center'].indexOf(window.mgmcConfig.mgmcConsentStyle)<0) ? closeBtn : "";
  teaserText += "<div id='consent-fixoption'";
  if ((window.mgmcConfig.mgmcConsentStyleFixCenterPos != "") && (['overlay', 'center'].indexOf(window.mgmcConfig.mgmcConsentStyle)>=0)) teaserText += "style='position: fixed;text-align:center;width:100%;margin-top:"+window.mgmcConfig.mgmcConsentStyleFixCenterPos+"'";
  teaserText += "><div id=\"consent-olinner\" style=\"max-width:"+window.mgmcConfig.mgmcConsentContentWidth+"; margin:100px auto; background:rgb(242,242,242); background:linear-gradient(150deg, rgba(255,255,255,1) 0%, rgba(250,250,250,1) 35%, rgba(242,242,242,1) 100%); border:1px solid #ccc; text-align:left; z-index: 1001\">";
  if (['overlay', 'center'].indexOf(window.mgmcConfig.mgmcConsentStyle)>=0) 
    teaserText += closeBtn;
  teaserText += "<div class='mgmc-dlg-padding' style=\"padding:20px 20px 10px 20px;margin:0 auto; max-width:"+window.mgmcConfig.mgmcConsentContentWidth+";\">" ; 

  var pp_txt = ui.dialogIntro + checkBoxes + CookieInfoTable + buttonsText + footerText ; 

  //Uebersicht der gegebenen bzw. blockierten (im Fall von Defaults) Zustimmungen
  var consentInfoText = '<h4>Aktuelle Auswahl</h4>' ;
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
  
  var delBtn = ((window._consentInfo != null) && (window._consentInfo != '')) ? "<a style='"+ui.buttonStyle+"' href='#' onclick='showHideConsentBanner("+oid+"); delConsentCookie(); return false;'>"+ui.buttons.deleteSettings+"</a>" : "";

  if (oid == 1) {
    var orgBtnText = "<p style='margin-top:1em;float:right'>"+delBtn+"<a style='"+ui.buttonStyle+"' href='#' onclick='showHideConsentBanner("+oid+"); showHideConsentBanner(0); return false;'>"+ui.buttons.changeSelection+"</a> <a style='"+ui.buttonStyle+"' href='#' onclick='showHideConsentBanner("+oid+"); return false;'>"+ui.buttons.close+"</a></p><div style=\"clear:both\"></div>" ;

    pp_txt = ui.dialogIntro + consentInfoText + CookieInfoTable + orgBtnText ;
  }

  teaserText += "<h2>"+ui.dialogTitle+"</h2>\n";
  teaserText += pp_txt + "</div></div>\n";

  el.innerHTML = teaserText;

  dl = document.getElementById("consent-overlay_vi");
  if (dl == null) {
    dl = document.createElement('div');
    dl.setAttribute('id','consent-overlay_vi');
    styleElement(dl);
    dl.style.background = "#222";
    dl.style.opacity = "0.8";
    dl.style.zIndex = "999";
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
  if (window.mgmcConfig.mgmcConsentStyle == 'overlay')
	  dl.style.visibility = ovZeigen ;
  else  
	  dl.style.visibility = 'hidden' ;
	el.style.visibility = ovZeigen ;
  return (ovZeigen === 'visible') ;
}