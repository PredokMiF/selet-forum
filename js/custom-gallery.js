export function runCustomPreGallery() {
    $('[id="galery-block"]').each((i, galeryParent) => {
        const $galeryParent = $(galeryParent)

        const srcList = $galeryParent.find('.galery img').toArray().map(el => $(el).attr('src'))
        const cards = srcList.map(src => `
            <div class="carousel-card" style="background-image: url('${src}');"></div>
        `).join('')


        $galeryParent.append(`
            <div class="galery-carousel carousel-wrapper" data-cout-foo="return 1">
                <div class="carousel-flip" data-flip="prev"></div>
        
                <div class="carousel-viewport">
                    <div class="hidden">
                        ${cards}
                    </div>        
                </div>
        
                <div class="carousel-flip" data-flip="next"><div class="carousel-flip-inner"></div></div>
            </div>
        `)

        $galeryParent.append(`<div class="carousel-paging"></div>`)
    })
}