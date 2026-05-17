/* Init tarteaucitron pour blueenergie.fr — voir politique-confidentialite.html */
(function () {
  tarteaucitron.init({
    "privacyUrl": "/politique-confidentialite.html",
    "bodyPosition": "bottom",
    "hashtag": "#tarteaucitron",
    "cookieName": "tarteaucitron",
    "orientation": "bottom",
    "groupServices": false,
    "showDetailsOnClick": true,
    "serviceDefaultState": "wait",
    "showAlertSmall": false,
    "cookieslist": true,
    "closePopup": false,
    "showIcon": true,
    "iconPosition": "BottomRight",
    "adblocker": false,
    "DenyAllCta": true,
    "AcceptAllCta": true,
    "highPrivacy": true,
    "handleBrowserDNTRequest": false,
    "removeCredit": false,
    "moreInfoLink": true,
    "useExternalCss": false,
    "useExternalJs": false,
    "readmoreLink": "/politique-confidentialite.html",
    "mandatory": true,
    "mandatoryCta": true
  });

  /* Google Analytics 4 */
  tarteaucitron.user.gtagUa = 'G-JEG722VJTV';
  tarteaucitron.user.gtagMore = function () {
    /* Évènement conversion sur /merci.html — repris du tag inline retiré */
    if (window.location.pathname === '/merci.html') {
      gtag('event', 'generate_lead', {
        'event_category': 'form',
        'event_label': 'study_request'
      });
    }
  };
  (tarteaucitron.job = tarteaucitron.job || []).push('gtag');
})();
