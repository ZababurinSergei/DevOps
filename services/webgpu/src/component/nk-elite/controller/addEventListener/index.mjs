import {Elite} from '../../this/index.mjs'
export default async (self, actions) => {
    let statusElement = self.querySelector('#status')
    let progressElement = self.querySelector('#progress')
    let spinnerElement = self.querySelector('#spinner')
    const input = self.querySelector('.nk-input')

    let Module = {
        print: function() {
            let e = self.querySelector('#output');
            return e && (e.value = ''), (...t) => {
                var n = t.join(' ');
                console.log(n), e && (e.value += n + '\n', e.scrollTop = e.scrollHeight);
            };
        }(),
        canvas: (() => {
            let e = self.querySelector('#canvas');
            return e.addEventListener('webglcontextlost', (e => {
                alert('WebGL context lost. You will need to reload the page.'), e.preventDefault();
            }), !1), e;
        })(),
        setStatus: e => {
            if (Module.setStatus.last || (Module.setStatus.last = { time: Date.now(), text: '' }), e !== Module.setStatus.last.text) {
                var t = e.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/), n = Date.now();
                t && n - Module.setStatus.last.time < 30 || (Module.setStatus.last.time = n, Module.setStatus.last.text = e, t ? (e = t[1], progressElement.value = 100 * parseInt(t[2]), progressElement.max = 100 * parseInt(t[4]), progressElement.hidden = !1, spinnerElement.hidden = !1) : (progressElement.value = null, progressElement.max = null, progressElement.hidden = !0, e || (spinnerElement.style.display = 'none')), statusElement.innerHTML = e);
            }
        },
        totalDependencies: 0,
        monitorRunDependencies: e => {
            Module.totalDependencies = Math.max(Module.totalDependencies, e), Module.setStatus(e ? 'Preparing... (' + (Module.totalDependencies - e) + '/' + Module.totalDependencies + ')' : 'All downloads complete.');
        }
    };

    Module.setStatus('Downloading...'), window.onerror = e => {
        Module.setStatus('Exception thrown, see JavaScript console'), spinnerElement.style.display = 'none', Module.setStatus = e => {
            e && console.error('[post-exception status] ' + e);
        };
    };

    const click = (event) => {
        let pointerLock = self.querySelector('#pointerLock').checked
        let resize = self.querySelector('#resize').checked
        Module.requestFullscreen(pointerLock, resize)
    }

    return {
        init: async () => {
            input.addEventListener('click', click)
            await Elite(Module)
        },
        terminate: () => {
            input.removeEventListener('click', click)
        }
    }
}