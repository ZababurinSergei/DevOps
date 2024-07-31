import { readFile } from 'fs/promises';

export const env = async (props) => {
    let ENV = {}

    try {
        const json = JSON.parse(
            await readFile(
                new URL('./env.json', import.meta.url)
            )
        );

        ENV = json
    } catch (e) {
        console.error('ERROR FETCH JSON', e)
    }

    console.log('ENV', ENV)

    return ENV
}