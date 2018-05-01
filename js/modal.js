const $body = $(document.body)

window.showModal = modalId => {
    $body.addClass(modalId)

    const $modal = $(`#${modalId}`)

    $modal.find('input, textarea').val('')
    $modal.find('input[type=checkbox]').each((i, el) => { el.checked = false })
    $modal.fadeIn(500)
}

window.hideModal = (modalId, fn) => {
    $(`#${modalId}`).fadeOut(500, () => {
        $body.removeClass(modalId)

        fn && fn();
    })
}

$body.on('click', '.close-action', e => {
    const modalId = $(e.target).closest('.modal').attr('id')

    hideModal(modalId)
})

$body.on('click', '#msg-create .submit-msg', () => {
    hideModal('msg-create', () => {
        showModal('msg-registred')
    })
})
