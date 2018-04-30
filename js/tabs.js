import { initComponents } from './app'


export function initTabs(el) {
    const $tWrapper = $(el)

    if ($tWrapper.data('initialized')) {
        return
    }
    $tWrapper.data('initialized', 'true')

    let getActiveTabOnInit = new Function($tWrapper.data('getActiveTabOnInit') || `return '${$tabHederList[0].dataset.pageId}'`)

    const $tHeader = $tWrapper.find('.component-tab-header-wrapper')
    const $tabHederList = $tWrapper.find('.component-tab-header[data-page-id]')
    const $tBody = $tWrapper.find('.component-tab-body-wrapper')

    let activeTab

    // INIT

    selectTab(getActiveTabOnInit())

    // ACTIONS

    $tHeader.on('click', '.component-tab-header[data-page-id]', e => {
        const tab = e.currentTarget
        const $tab = $(tab)
        const tabId = $tab.data('pageId')

        if (activeTab === tabId) {
            return
        }

        selectTab(tabId)

        const tabs = $(`.component-tab-header[data-page-id="${tabId}"]`).toArray().filter(el => el !== tab)
        tabs.forEach(el => $(el).click())
    })

    // HELPERS

    function selectTab(tabName) {
        if (activeTab === tabName) {
            return
        }
        activeTab = tabName

        // HEADER
        $tabHederList.removeClass('active')
        $tHeader.find(`.component-tab-header[data-page-id="${tabName}"]`).addClass('active')

        // PAGE
        let $prevActiveTab = $tBody.find(`.component-tab-body.active`).removeClass('active')
        let $nextActiveTab = $tBody.find(`.component-tab-body[data-page-id="${tabName}"]`)

        // Уничтожаем все ссылки yна объекты
        $prevActiveTab.html($prevActiveTab.html())
        $nextActiveTab.html($nextActiveTab.html())

        $nextActiveTab.addClass('active')
        initComponents($nextActiveTab)
    }
}
