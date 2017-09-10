/**
 * Polygon Template
 */
;(function() {
    'use strict';

    NodeList.prototype.forEach || (NodeList.prototype.forEach = Array.prototype.forEach);

    function debounce(fn, delay) {
        var timeout;
        return function(e) {
            timeout && clearTimeout(timeout);
            timeout = setTimeout(function() { fn(e); }, delay);
        };
    }

    var isTouch = (!!('ontouchstart' in window) ||
        (navigator.MaxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));

    var msPointerSupported = window.navigator.msPointerEnabled;

    var eventType = {
        'touch': {
            startEvent: 'touchstart',
            moveEvent: 'touchmove',
            endEvent: 'touchend'
        },
        'MSPointer': {
            startEvent: 'MSPointerDown',
            moveEvent: 'MSPointerMove',
            endEvent: 'MSPointerUp'
        },
        'mouse': {
            startEvent: 'mousedown',
            moveEvent: 'mousemove',
            endEvent: 'mouseup'
        }
    };

    var type = null;
    if (isTouch) {
        type = 'touch';
    } else if (msPointerSupported) {
        type = 'MSPointer';
    } else {
        type = 'mouse';
    }

    var startEvent = eventType[type].startEvent;
    var moveEvent = eventType[type].moveEvent;
    var endEvent = eventType[type].endEvent;

    function getCoords(e) {
        return {
            x: e.pageX || e.touches[0].pageX,
            y: e.pageY || e.touches[0].pageY
        };
    }

    var doc = document.documentElement;
    var form = document.forms['viewport-form'];
    var sets = form.querySelectorAll('.form__fieldset');
    var widthInput = form.querySelector('[name="width"]');
    var heightInput = form.querySelector('[name="height"]');
    var screen = document.querySelector('.screen__content');
    var btnH = document.querySelector('.screen__resize_h');
    var btnV = document.querySelector('.screen__resize_v');
    var btnX = document.querySelector('.screen__resize_x');

    var startPoint = {
        x: null,
        y: null
    };

    var dragMode;

    function setSize(props) {
        var w = props && props.width;
        var h = props && props.height;
        if (w) {
            screen.width = w;
            widthInput.value = screen.width;
        }
        if (h) {
            screen.height = h;
            heightInput.value = screen.height;
        }
    }

    setSize({
        width: 400,
        height: 400
    });

    var handlers = {
        'mode': function(name, value) {
            sets.forEach(function(elem) {
                elem.disabled = (elem.id === value) ? false : true;
            });
        },

        'width': function(name, value) {
            screen[name] = value;
        },

        'height': function(name, value) {
            screen[name] = value;
        },

        'size': function(name, value) {
            var size = value.split('x').map(parseFloat);
            screen.width = size[0];
            screen.height = size[1];
        }
    };

    function onChange(e) {
        if (!e.target) return;
        var value = e.target.value;
        var name = e.target.name;

        if (name in handlers) {
            handlers[name](name, value);
        }
    }

    function onDragStart(e) {
        doc.className = 'ctx-drag';
        dragMode = e.target.value;
        startPoint = getCoords(e);
        document.addEventListener(moveEvent, onDragMove);
        document.addEventListener(endEvent, onDragEnd);
    }

    function onDragMove(e) {
        var point = getCoords(e);
        var diffX = point.x - startPoint.x;
        var diffY = point.y - startPoint.y;
        startPoint = point;
        var width = +screen.width + diffX;
        var height = +screen.height + diffY;
        if (dragMode === 'h') {
            setSize({ width: width });
        }
        if (dragMode === 'v') {
            setSize({ height: height });
        }
        if (dragMode === 'x') {
            setSize({
                width: width,
                height: height
            });
        }
    }

    function onDragEnd(e) {
        doc.className = '';
        dragMode = null;
        document.removeEventListener(moveEvent, onDragMove);
        document.removeEventListener(endEvent, onDragEnd);
    }

    form.addEventListener('change', onChange);
    form.addEventListener('input', debounce(onChange, 200));

    [btnH, btnV, btnX].forEach(function(btn) {
        btn.addEventListener(startEvent, onDragStart);
    });


})();
