const myHeaders = new Headers();

const envInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
};

let ENV = {}

try {
    const url = new URL("./env.json", import.meta.url)
    const myRequest = new Request(url.pathname, envInit);
    const response = await fetch(myRequest);
    ENV = await response.json()
} catch (e) {
    console.error('ERROR FETCH JSON', e)
}
export const env = (props) => {
    return ENV
}