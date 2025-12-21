# Simple Consent Manager
Simple custom JavaScript-only consent manager script. Only German comments included - sorry.

**Note**: This script is still work in progress, even if this thing is in use at https://www.analytrix.de since 2018. Use it at your own technical and legal risk. 

## Documentation / Example
There is a live example and documentation (in German language) for an older version (without dataLayer support and Consent Mode options) available at https://www.analytrix.de/simple-consent-manager.html. Newer options are described briefly in the main file. 

## Features
- extensive configuration object for all options, texts, cookie descriptions, layout. The main file `mgm_consent.js` contains an example configuration that can be extracted and defined in your main code or elsewhere before loading the script  
- can be used with multiple or a singe category / group
- different display modes, including overlay     
- optionally pushes consent to dataLayer
- supports Google Consent Mode, MS UET Consent Mode, MS Clarity Consent Mode

## Data Layer Format
If a dataLayer event name is defined (default: `consent_ready`), a push with all current states for groups will occur. Example:
```
{ event:"consent_ready",
  consentInfo":{
    tracking:true,
    group2:false,
    group3:false
  }
}
```
