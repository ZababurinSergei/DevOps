const getRandomValues = () => {
    return Array.from({length: 50}, () => Math.floor(Math.random() * 50)).join('');
};

export default async () => {
    const root = await navigator.storage.getDirectory();
    for (let i = 0; i < 10; i++) {
        const directoryHandle = await root.getDirectoryHandle('directory' + i, {create: true});
        for (let j = 0; j < 10; j++) {
            const fileHandle = await directoryHandle.getFileHandle('file' + j + '.txt', {create: true});
            const writable = await fileHandle.createWritable();
            await writable.write('Hello, world ' + i + '/' + j + '!\n\n' + getRandomValues());
            await writable.close();
        }
    }
}