import { initCarousel } from './carousel'
import { initTabs } from './tabs'

export function initComponents(wrapper) {
    const $wrapper = $(wrapper || document.body)

    // TAB

    $wrapper.find('.component-tab-wrapper').each((i, el) => {
        initTabs(el)
    })

    // CAROUSEL

    $wrapper.find('.faq-carousel-wrapper').each((i, el) => {
        initCarousel(el)
    })

}

$(initComponents);

(function () {
    const galeryList = document.getElementsByClassName('galery')

    for (let i = 0; i < galeryList.length; i++) {
        lightGallery(galeryList[i], {})
    }
})();