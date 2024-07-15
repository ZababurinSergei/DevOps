export {devTools} from './opfs/devtools.js'
export {contentscript} from './opfs/contentscript.js'
export {test} from './opfs/test.mjs'
export { idKey } from './idKey/index.js'
// export { editor } from './edit-context/html-editor/editor.js'
export {editor} from './codemirror/index.mjs'
// For a primer on async/await, see
// https://developers.google.com/web/fundamentals/getting-started/primers/async-functions
export async function storeDataAndUpdateUI(self, dataUrl) {
    // Pro-tip: The Cache Storage API is available outside of service workers!
    // See https://googlechrome.github.io/samples/service-worker/window-caches/
    const cache = await caches.open('data-cache');
    await cache.add(dataUrl);

    if ('storage' in navigator && 'estimate' in navigator.storage) {
        const {usage, quota} = await navigator.storage.estimate();
        const percentUsed = Math.round(usage / quota * 100);
        const usageInMib = Math.round(usage / (1024 * 1024));
        const quotaInMib = Math.round(quota / (1024 * 1024));

        const details = `${usageInMib} out of ${quotaInMib} MiB used (${percentUsed}%)`;

        // This assumes there's a <span id="storageEstimate"> or similar on the page.
        self.shadowRoot.querySelector('#storageEstimate').innerText = details;
    }
}

export default {
    description: "description for mjs"
}