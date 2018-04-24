import { initCarousel } from './carousel'
import { initTabs } from './tabs'

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

$(initComponents);

$(window).on('resize', () => {
    setInterval(initComponents, 1000)
});

(function () {
    const galeryList = document.getElementsByClassName('galery')

    for (let i = 0; i < galeryList.length; i++) {
        lightGallery(galeryList[i], {})
    }
})();