import { debounce } from "./debounce";

export function initVideo() {

    const $window = $(window)

    $(() => {
        const resolution = getResolution()
        if (resolution >= 768) {
            addYoutube()
        } else {
            const cb = debounce(() => {
                const resolution = getResolution()
                console.log(1)
                if (resolution >= 768) {
                    console.log(2)
                    addYoutube()
                    $(window).off('resize', cb);
                }
            }, 50)
            $(window).on('resize', cb);
        }
    })

    function addYoutube() {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Ждем инициализацию видео

    new Promise(resolve => {
        window.onYouTubeIframeAPIReady = resolve
    }).then(ytInitialized, e => console.error(e) )

    function ytInitialized() {
        let player
        let playing
        let $iframe

        startVideo();

        $(window).on('resize', debounce(startVideo, 50));

        function startVideo() {
            const resolution = getResolution()

            tryVideoWidth()

            // Пытаемся не грузить ютубовские либы раньше времени
            if (resolution >= 768) {
                if (!player) {
                    initVideo()
                } else if (!playing && player.playVideo) {
                    player.playVideo()
                    playing = true
                }
            } else if (player && playing) {
                player.stopVideo()
                $iframe.removeClass('playing')
                playing = false
            }
        }

        function initVideo() {
            player = new YT.Player('header-bg-video', {
                // videoId: '668nUCeBHyY', // Короткое видео, для тестирования
                videoId: 'gJ0EGZAtqJo',
                playerVars: {
                    controls: 0,
                    rel: 0,
                    showinfo: 0,
                    disablekb: 1,
                },
                events: {
                    onReady: event => {
                        event.target.playVideo();
                        player.mute()
                        $iframe = $('#header-bg-video')
                        $('#header-block').css('height', '')
                        playing = true
                    },
                    onStateChange: event => {
                        if (event.data === YT.PlayerState.PLAYING) {
                            $iframe.addClass('playing')
                        }
                        if (event.data === YT.PlayerState.ENDED) {
                            event.target.playVideo();
                        }
                    }
                }
            });

            tryVideoWidth()
        }
    }

    function getResolution() {
        return $window.outerWidth()
    }
    
    function tryVideoWidth() {
        const $iframe = $('#header-bg-video');
        $iframe.css('height', $iframe.outerWidth() / 1.777777777 + 'px');
    }
}