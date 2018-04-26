export function debounce(fn, ms) {
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