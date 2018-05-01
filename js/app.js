import { debounce } from './debounce'
import { initVideo } from './video'
import { initCarousel } from './carousel'
import { initAutoheight } from './autoheight'
import { initTabs } from './tabs'
import './animate-show'
import './modal'

import { runCustomPreGallery } from './custom-gallery'

export function initComponents(wrapper) {
    const $wrapper = $(wrapper || document.body)

    // TAB

    $wrapper.find('.component-tab-wrapper').each((i, el) => {
        initTabs(el)
    })

    // CAROUSEL

    $wrapper.find('.carousel-wrapper').each((i, el) => {
        initCarousel(el)
    })

    // AUTOHEIGHT

    $wrapper.find('.autoheight').each((i, el) => {
        initAutoheight(el)
    })

}



(function () {

    (function(){
        let arr = []

        window._onload = function (fn) {
            if (arr) {
                arr.push(fn)
            } else {
                fn()
            }
        }

        window.onload = () => {
            arr.forEach(fn => fn())
            arr = null
        }
    })();

    // AJAX LOADER

    window._onload(() => {
        $(document.body).css('overflow', '')
        $('#ajax-loader').fadeOut(500);
    });

    runCustomPreGallery();

    initVideo();

    //////////////////////////////
    // CMN CMP
    //////////////////////////////

    $(initComponents);
    window._onload(initComponents);
    $(window).on('resize', debounce(initComponents, 50));


    //////////////////////////////
    // Галерея
    //////////////////////////////

    const galeryList = document.getElementsByClassName('galery')
    for (let i = 0; i < galeryList.length; i++) {
        lightGallery(galeryList[i], {})
    }
})();
