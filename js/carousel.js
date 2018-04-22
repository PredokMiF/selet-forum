export function initCarousel(el) {
    const $cWrapper = $(el);
    const $cViewport = $cWrapper.find('.faq-carousel-viewport')
    const $cPaging = $cWrapper.parent().find('.faq-carousel-paging')

    if ($cWrapper.data('initialized')) {
        return
    }
    $cWrapper.data('initialized', 'true')

    let fullWwidth = $cWrapper.outerWidth()
    let width = $cViewport.outerWidth()

    const pageSize = fullWwidth >= 1280 ? 6 : fullWwidth >= 768 ? 4 : 1
    const pageCloumns = Math.ceil(pageSize / 2)
    const pages = []

    const space = (width - $cViewport.find('.faq-carousel-card').outerWidth() * pageCloumns) / (pageCloumns === 1 ? 1 : pageCloumns - 1)
    const stepWidth = width + space

    $cViewport[0].scrollLeft = 0

    const $cardList = $cViewport.find('.faq-carousel-card')

    $cardList.removeClass('last')

    $cardList.each((i, el) => {
        if (i % pageSize === 0) {
            const $page = $(`<div class="faq-carousel-page"></div>`)

            $page.css('left', pages.length * stepWidth + 'px')

            pages.push($page)
        }
        if (i % pageCloumns === pageCloumns - 1) {
            $(el).addClass('last')
        }
        pages[pages.length - 1].append(el)
    })

    $cViewport.empty()
    pages.forEach($el => $cViewport.append($el))

    $cPaging.empty()
    pages.forEach((el, i) => {
        const $pagingItem = $('<div class="faq-carousel-paging-item"><div class="faq-carousel-paging-item-inner"></div></div>')

        if (i === 0) {
            $pagingItem.addClass('active')
        }
        $pagingItem.data('active', i)

        $cPaging.append($pagingItem)
    })
    //

    // ACIONS

    let active = 0
    $cWrapper.on('click', '.faq-carousel-flip', e => {
        const $btn = $(e.currentTarget)
        $btn.data('flip') === 'prev' ? active-- : active++

        if (active < 0) {
            active = pages.length -1
        } else if (active >= pages.length) {
            active = 0
        }

        flip()
    })

    $cWrapper.parent().on('click', '.faq-carousel-paging-item', e => {
        const $btn = $(e.currentTarget)

        const newActive = +$btn.data('active')

        if (newActive !== active) {
            active = +$btn.data('active')
            flip()
        }
    })

    // HELPERS

    function flip() {
        $cViewport.find('.faq-carousel-page').each((i, el) => {
            $(el).css('left', i * stepWidth - active * stepWidth + 'px')
        })

        const $pagingItems = $cPaging.find('.faq-carousel-paging-item')
        $pagingItems.removeClass('active')
        $($pagingItems[active]).addClass('active')
    }
}
//
//
// });