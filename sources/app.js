/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = debounce;
function debounce(fn, ms) {
    var t = void 0;
    return function () {
        if (t) {
            return;
        }
        t = setTimeout(function () {
            t = null;
            fn();
        }, ms);
    };
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["initComponents"] = initComponents;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__debounce__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__video__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__carousel__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__autoheight__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__animate_show__ = __webpack_require__(6);







function initComponents(wrapper) {
    var $wrapper = $(wrapper || document.body);

    // TAB

    $wrapper.find('.component-tab-wrapper').each(function (i, el) {
        Object(__WEBPACK_IMPORTED_MODULE_4__tabs__["a" /* initTabs */])(el);
    });

    // CAROUSEL

    $wrapper.find('.carousel-wrapper').each(function (i, el) {
        Object(__WEBPACK_IMPORTED_MODULE_2__carousel__["a" /* initCarousel */])(el);
    });

    // AUTOHEIGHT

    $wrapper.find('.autoheight').each(function (i, el) {
        Object(__WEBPACK_IMPORTED_MODULE_3__autoheight__["a" /* initAutoheight */])(el);
    });
}

(function () {

    Object(__WEBPACK_IMPORTED_MODULE_1__video__["a" /* initVideo */])();

    //////////////////////////////
    // CMN CMP
    //////////////////////////////

    $(initComponents);
    $(window).on('resize', Object(__WEBPACK_IMPORTED_MODULE_0__debounce__["a" /* debounce */])(initComponents, 50));

    //////////////////////////////
    // Галерея
    //////////////////////////////

    var galeryList = document.getElementsByClassName('galery');
    for (var i = 0; i < galeryList.length; i++) {
        lightGallery(galeryList[i], {});
    }
})();

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initVideo;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__debounce__ = __webpack_require__(0);


function initVideo() {

    var $window = $(window);

    // Async add script

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Ждем инициализацию видео

    new Promise(function (resolve) {
        window.onYouTubeIframeAPIReady = resolve;
    }).then(ytInitialized, function (e) {
        return console.error(e);
    });

    function ytInitialized() {
        var player = void 0;
        var playing = void 0;
        var $iframe = void 0;

        startVideo();

        $(window).on('resize', Object(__WEBPACK_IMPORTED_MODULE_0__debounce__["a" /* debounce */])(startVideo, 50));

        function startVideo() {
            var resolution = getResolution();

            tryVideoWidth();

            if (resolution >= 768) {
                if (!player) {
                    initVideo();
                } else if (!playing) {
                    player.playVideo();
                    playing = true;
                }
            } else if (player && playing) {
                player.stopVideo();
                $iframe.removeClass('playing');
                playing = false;
            }
        }

        function initVideo() {
            player = new YT.Player('header-bg-video', {
                // videoId: '668nUCeBHyY', // Короткое видео, для тестирования
                videoId: 'gJ0EGZAtqJo',
                playerVars: {
                    controls: 0,
                    rel: 0,
                    showinfo: 0,
                    disablekb: 1
                },
                events: {
                    onReady: function onReady(event) {
                        event.target.playVideo();
                        player.mute();
                        $iframe = $('#header-bg-video');
                        $('#header-block').css('height', '');
                        playing = true;
                    },
                    onStateChange: function onStateChange(event) {
                        if (event.data === YT.PlayerState.PLAYING) {
                            $iframe.addClass('playing');
                        }
                        if (event.data === YT.PlayerState.ENDED) {
                            event.target.playVideo();
                        }
                    }
                }
            });

            tryVideoWidth();
        }
    }

    function getResolution() {
        return $window.outerWidth();
    }

    function tryVideoWidth() {
        var $iframe = $('#header-bg-video');
        $iframe.css('height', $iframe.outerWidth() / 1.777777777 + 'px');
    }
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initCarousel;
function initCarousel(el) {
    var $el = $(el);
    var $cWrapper = $(el);
    var $cViewport = $cWrapper.find('.carousel-viewport');
    var $cPaging = $cWrapper.parent().find('.carousel-paging');

    $cWrapper.data('initialized', 'true');

    var fullWidth = $(window).outerWidth();
    var width = $cViewport.outerWidth();

    var pageSize = new Function('fullWidth', $el.data('coutFoo'))(fullWidth); //fullWidth >= 1280 ? 6 : fullWidth >= 768 ? 4 : 1
    var pageCloumns = Math.ceil(pageSize / 2);
    var pages = [];

    var space = (width - $cViewport.find('.carousel-card').outerWidth() * pageCloumns) / (pageCloumns === 1 ? 1 : pageCloumns - 1);
    var stepWidth = width + space;

    if ($cWrapper.data('initialized') && pageSize.toString() === $el.data('pageSize')) {
        return;
    }

    $el.data('pageSize', pageSize.toString());

    $cViewport[0].scrollLeft = 0;

    var $cardList = $cViewport.find('.carousel-card');

    $cardList.removeClass('last');

    $cardList.each(function (i, el) {
        if (i % pageSize === 0) {
            var $page = $('<div class="carousel-page"></div>');

            $page.css('left', pages.length * stepWidth + 'px');

            pages.push($page);
        }
        if (i % pageCloumns === pageCloumns - 1) {
            $(el).addClass('last');
        }
        pages[pages.length - 1].append(el);
    });

    $cViewport.empty();
    pages.forEach(function ($el) {
        return $cViewport.append($el);
    });

    if (pages.length > 1) {
        $el.addClass('multipage').removeClass('singlepage');
    } else {
        $el.addClass('singlepage').removeClass('multipage');
    }

    $cPaging.empty();
    pages.forEach(function (el, i) {
        var $pagingItem = $('<div class="carousel-paging-item"><div class="carousel-paging-item-inner"></div></div>');

        if (i === 0) {
            $pagingItem.addClass('active');
        }
        $pagingItem.data('active', i);

        $cPaging.append($pagingItem);
    });

    // ACIONS

    var active = 0;
    $cWrapper.on('click', '.carousel-flip', function (e) {
        var $btn = $(e.currentTarget);
        $btn.data('flip') === 'prev' ? active-- : active++;

        if (active < 0) {
            active = pages.length - 1;
        } else if (active >= pages.length) {
            active = 0;
        }

        flip();
    });

    $cWrapper.parent().on('click', '.carousel-paging-item', function (e) {
        var $btn = $(e.currentTarget);

        var newActive = +$btn.data('active');

        if (newActive !== active) {
            active = +$btn.data('active');
            flip();
        }
    });

    // HELPERS

    function flip() {
        $cViewport.find('.carousel-page').each(function (i, el) {
            $(el).css('left', i * stepWidth - active * stepWidth + 'px');
        });

        var $pagingItems = $cPaging.find('.carousel-paging-item');
        $pagingItems.removeClass('active');
        $($pagingItems[active]).addClass('active');
    }
}

window.initCarousel = initCarousel;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initAutoheight;
function initAutoheight(el) {
    var $el = $(el);
    var fn = new Function('resolution, width', $el.data('fn'));

    $el.css('height', fn($(window).outerWidth(), $el.outerWidth()));
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initTabs;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(1);


function initTabs(el) {
    var $tWrapper = $(el);

    if ($tWrapper.data('initialized')) {
        return;
    }
    $tWrapper.data('initialized', 'true');

    var getActiveTabOnInit = new Function($tWrapper.data('getActiveTabOnInit') || 'return \'' + $tabHederList[0].dataset.pageId + '\'');

    var $tHeader = $tWrapper.find('.component-tab-header-wrapper');
    var $tabHederList = $tWrapper.find('.component-tab-header[data-page-id]');
    var $tBody = $tWrapper.find('.component-tab-body-wrapper');

    var activeTab = void 0;

    // INIT

    selectTab(getActiveTabOnInit());

    // ACTIONS

    $tHeader.on('click', '.component-tab-header[data-page-id]', function (e) {
        var $tab = $(e.currentTarget);
        var tabId = $tab.data('pageId');

        selectTab(tabId);
    });

    // HELPERS

    function selectTab(tabName) {
        if (activeTab === tabName) {
            return;
        }
        activeTab = tabName;

        // HEADER
        $tabHederList.removeClass('active');
        $tHeader.find('.component-tab-header[data-page-id="' + tabName + '"]').addClass('active');

        // PAGE
        var $prevActiveTab = $tBody.find('.component-tab-body.active').removeClass('active');
        var $nextActiveTab = $tBody.find('.component-tab-body[data-page-id="' + tabName + '"]');

        // Уничтожаем все ссылки yна объекты
        $prevActiveTab.html($prevActiveTab.html());
        $nextActiveTab.html($nextActiveTab.html());

        $nextActiveTab.addClass('active');
        Object(__WEBPACK_IMPORTED_MODULE_0__app__["initComponents"])($nextActiveTab);
    }
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__debounce__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animate_show_less__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animate_show_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__animate_show_less__);



(function () {

    var transitionTime = 1700;
    var el2ShowList = void 0;

    function init() {
        el2ShowList = calcHeights(getEls2Show());
        scroll();
    }

    var scroll = Object(__WEBPACK_IMPORTED_MODULE_0__debounce__["a" /* debounce */])(function _scroll() {
        var $window = $(window);
        var wHeight = $window.height();
        var scrollTop = $window.scrollTop();
        var wndBottom = scrollTop + wHeight - 0.25 * wHeight;

        el2ShowList.forEach(function (_ref) {
            var el = _ref.el,
                top = _ref.top;

            if (top <= wndBottom) {
                var $el = $(el);
                $el.addClass('animating');

                var textShifted = $el.find('.animate-shift').toArray().map(function (el) {
                    return $(el);
                });
                textShifted = textShifted.filter(function ($el) {
                    return !$el.hasClass('animating');
                });
                textShifted.forEach(function ($el) {
                    return $el.addClass('animating');
                });

                setTimeout(function () {
                    $el.removeClass('animate-show animating');
                    textShifted.forEach(function ($el) {
                        return $el.removeClass('animate-shift animating');
                    });
                }, transitionTime);
            }
        });

        el2ShowList = calcHeights(getEls2Show());
    }, 50);

    function getEls2Show() {
        var animateToShow = $('.animate-show').toArray();

        return animateToShow.filter(function (el) {
            return !$(el).hasClass('animating');
        });
    }

    function calcHeights(els) {
        var arr = [];

        els.forEach(function (el) {
            arr.push({
                el: el,
                top: $(el).offset().top
            });
        });

        return arr;
    }

    new Promise(function (resolve) {
        // Начинаем показывать через секунду, или как загрузится. Что наступит раньше
        setTimeout(resolve, 1000);
        $(resolve);
    }).then(function () {
        init();

        $(init);
        $(window).on('resize', init);
        $(window).on('scroll', scroll);
    });
})();

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map