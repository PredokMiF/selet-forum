import './animate-show.less'


(() => {

    const transitionTime = 1700
    let el2ShowList

    function init() {
        el2ShowList = calcHeights(getEls2Show())
        scroll()
    }

    const scroll = debounce(function _scroll() {
        const $window = $(window)
        const wHeight = $window.height()
        const scrollTop = $window.scrollTop()
        const wndBottom = scrollTop + wHeight - 0.1 * wHeight

        el2ShowList.forEach(({ el, top }) => {
            if (top <= wndBottom) {
                const $el = $(el)
                $el.addClass('animating')

                let textShifted = $el.find('.animate-shift').toArray().map(el => $(el))
                textShifted = textShifted.filter($el => !$el.hasClass('animating'))
                textShifted.forEach($el => $el.addClass('animating'))

                setTimeout(() => {
                    $el.removeClass('animate-show animating')
                    textShifted.forEach($el => $el.removeClass('animate-shift animating'))
                }, transitionTime)
            }
        })

        el2ShowList = calcHeights(getEls2Show())
    }, 300)

    function getEls2Show() {
        const animateToShow = $('.animate-show').toArray()

        return animateToShow.filter(el => !$(el).hasClass('animating'))
    }

    function calcHeights(els) {
        const arr = []

        els.forEach(el => {
            arr.push({
                el,
                top: $(el).position().top,
            })
        })

        return arr
    }

    function debounce(fn, ms) {
        let t
        return function () {
            if (t) {
                return
            }
            t = setTimeout(() => {
                t = null;
                fn()
            }, ms)
        }
    }


    new Promise(resolve => {
        // Начинаем показывать через секунду, или как загрузится. Что наступит раньше
        setTimeout(resolve, 1000);
        $(resolve)
    }).then(() => {
        init()

        $(() => init)
        $(window).on('resize', init)
        $(window).on('scroll', scroll)
    })

})();