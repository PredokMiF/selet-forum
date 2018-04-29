export function runCustomPreGallery() {
    const $galeryParent = $('#galery-block')

    $galeryParent.append(`<div class="galery-carousel carousel-wrapper" data-cout-foo="return 1">
        <div class="carousel-flip" data-flip="prev"></div>

        <div class="carousel-viewport"></div>

        <div class="carousel-flip" data-flip="next"></div>
    </div>`)

    $galeryParent.append(`<div class="carousel-paging"></div>`)
}