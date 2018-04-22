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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["initComponents"] = initComponents;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__carousel__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tabs__ = __webpack_require__(2);



function initComponents(wrapper) {
    var $wrapper = $(wrapper || document.body);

    // TAB

    $wrapper.find('.component-tab-wrapper').each(function (i, el) {
        Object(__WEBPACK_IMPORTED_MODULE_1__tabs__["a" /* initTabs */])(el);
    });

    // CAROUSEL

    $wrapper.find('.faq-carousel-wrapper').each(function (i, el) {
        Object(__WEBPACK_IMPORTED_MODULE_0__carousel__["a" /* initCarousel */])(el);
    });
}

$(initComponents);

(function () {
    var galeryList = document.getElementsByClassName('galery');

    for (var i = 0; i < galeryList.length; i++) {
        lightGallery(galeryList[i], {});
    }
})();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initCarousel;
function initCarousel(el) {
    var $cWrapper = $(el);
    var $cViewport = $cWrapper.find('.faq-carousel-viewport');
    var $cPaging = $cWrapper.parent().find('.faq-carousel-paging');

    if ($cWrapper.data('initialized')) {
        return;
    }
    $cWrapper.data('initialized', 'true');

    var fullWwidth = $cWrapper.outerWidth();
    var width = $cViewport.outerWidth();

    var pageSize = fullWwidth >= 1280 ? 6 : fullWwidth >= 768 ? 4 : 1;
    var pageCloumns = Math.ceil(pageSize / 2);
    var pages = [];

    var space = (width - $cViewport.find('.faq-carousel-card').outerWidth() * pageCloumns) / (pageCloumns === 1 ? 1 : pageCloumns - 1);
    var stepWidth = width + space;

    $cViewport[0].scrollLeft = 0;

    var $cardList = $cViewport.find('.faq-carousel-card');

    $cardList.removeClass('last');

    $cardList.each(function (i, el) {
        if (i % pageSize === 0) {
            var $page = $('<div class="faq-carousel-page"></div>');

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

    $cPaging.empty();
    pages.forEach(function (el, i) {
        var $pagingItem = $('<div class="faq-carousel-paging-item"><div class="faq-carousel-paging-item-inner"></div></div>');

        if (i === 0) {
            $pagingItem.addClass('active');
        }
        $pagingItem.data('active', i);

        $cPaging.append($pagingItem);
    });
    //

    // ACIONS

    var active = 0;
    $cWrapper.on('click', '.faq-carousel-flip', function (e) {
        var $btn = $(e.currentTarget);
        $btn.data('flip') === 'prev' ? active-- : active++;

        if (active < 0) {
            active = pages.length - 1;
        } else if (active >= pages.length) {
            active = 0;
        }

        flip();
    });

    $cWrapper.parent().on('click', '.faq-carousel-paging-item', function (e) {
        var $btn = $(e.currentTarget);

        var newActive = +$btn.data('active');

        if (newActive !== active) {
            active = +$btn.data('active');
            flip();
        }
    });

    // HELPERS

    function flip() {
        $cViewport.find('.faq-carousel-page').each(function (i, el) {
            $(el).css('left', i * stepWidth - active * stepWidth + 'px');
        });

        var $pagingItems = $cPaging.find('.faq-carousel-paging-item');
        $pagingItems.removeClass('active');
        $($pagingItems[active]).addClass('active');
    }
}
//
//
// });

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initTabs;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(0);


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

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map