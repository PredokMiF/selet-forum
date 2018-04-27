import { debounce } from "./debounce";

export function initVideo() {

    const $window = $(window)

    // Async add script

    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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

            if (resolution >= 768) {
                if (!player) {
                    initVideo()
                } else if (!playing) {
                    player.playVideo()
                    $iframe.addClass('playing')
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
                // videoId: '668nUCeBHyY',
                videoId: 'gJ0EGZAtqJo',
                controls: 0,
                rel: 0,
                // showinfo: 0,
                // disablekb: 1,
                enablejsapi: 1,
                // iv_load_policy: 3,
                // loop: 1,
                // modestbranding: 1,
                // playlist: 'gJ0EGZAtqJo',
                // loopPlaylists: 'gJ0EGZAtqJo',
                // /**/showing: 0,
                // autohide: 3,
                events: {
                    onReady: event => {
                        event.target.playVideo();
                        player.mute()
                        $iframe = $('#header-bg-video')
                        playing = true
                    },
                    onStateChange: event => {
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