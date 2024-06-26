import {IDE} from './index.mjs'

export default async (self, mount) => {
    const style = document.createElement('style');
    style.textContent = `@import './index.css';`;
    mount.appendChild(style)

    const API = await IDE(self, mount, self.api)
    API.root.render(API.app)
    console.log('API IDE', API)
    return self
}