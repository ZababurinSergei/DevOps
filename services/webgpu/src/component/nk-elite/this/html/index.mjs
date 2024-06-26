import template from './default/index.mjs'
export const loadHTML = (htmlRelativeUrl, baseUrl) => {
    const htmlUrl = new URL(htmlRelativeUrl, baseUrl).href;
    return fetch(htmlUrl).then(response => response.text());
}

export {template}
export default  template