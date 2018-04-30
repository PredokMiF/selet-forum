export function initAutoheight(el) {
    const $el = $(el)
    const fn = new Function('resolution, width', $el.data('fn'))

    $el.css('height', fn($(window).outerWidth(), $el.outerWidth()))
}