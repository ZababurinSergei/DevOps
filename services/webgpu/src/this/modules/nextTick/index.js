export default (function(window, prefixes, i, p, fnc, to) {
    while (!fnc && i < prefixes.length) {
        fnc = window[prefixes[i++] + 'equestAnimationFrame'];
    }
    return (fnc && fnc.bind(window)) || window.setImmediate || function(fnc) {window.setTimeout(fnc, 0);};
})(typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : global, 'r webkitR mozR msR oR'.split(' '), 0);
