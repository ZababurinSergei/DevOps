import compoenents from './default/index.mjs'
export const loadHTML = (htmlRelativeUrl, baseUrl) => {
    const htmlUrl = new URL(htmlRelativeUrl, baseUrl).href;
    return fetch(htmlUrl).then(response => response.text());
}

export const html=  compoenents

export default  {
    description: 'component'
}