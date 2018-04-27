import { debounce } from './debounce'
import { initVideo } from './video'
import { initCarousel } from './carousel'
import { initTabs } from './tabs'
import './animate-show'

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

}



(function () {

    initVideo();


    //////////////////////////////
    // CMN CMP
    //////////////////////////////

    $(initComponents);
    $(window).on('resize', debounce(initComponents, 1000));


    //////////////////////////////
    // Галерея
    //////////////////////////////

    const galeryList = document.getElementsByClassName('galery')
    for (let i = 0; i < galeryList.length; i++) {
        lightGallery(galeryList[i], {})
    }
})();
