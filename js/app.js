import { debounce } from './debounce'
import { initVideo } from './video'
import { initCarousel } from './carousel'
import { initAutoheight } from './autoheight'
import { initTabs } from './tabs'
import './animate-show'

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

    runCustomPreGallery();

    initVideo();

    //////////////////////////////
    // CMN CMP
    //////////////////////////////

    $(initComponents);
    $(window).on('resize', debounce(initComponents, 50));


    //////////////////////////////
    // Галерея
    //////////////////////////////

    const galeryList = document.getElementsByClassName('galery')
    for (let i = 0; i < galeryList.length; i++) {
        lightGallery(galeryList[i], {})
    }
})();
