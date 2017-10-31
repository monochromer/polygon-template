export default function hello() {
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        var n = '\n\n\n';
        var t = [
            '%c POLYGON https://github.com/monochromer/polygon-template',
            `
                padding: 2em;
                letter-spacing: 1ex;
                font-weight: 300;
                color: #fff;
                background: #1d1d1d;
            `
        ];
        window.console.log(n);
        window.console.log.apply(console, t);
        window.console.log(n);
    } else {
        window.console && window.console.log('POLYGON https://github.com/monochromer/polygon-template')
    }
}
