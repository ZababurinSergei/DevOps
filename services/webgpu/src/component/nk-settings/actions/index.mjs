export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        resolve({
            button: {
                upload: async (event) => {
                    if(self.control.button.upload.classList.contains('disabled')){
                        return
                    }

                    const file = await self.readFile('/git/services/checklist/src/this/fonts/Raleway/static/Raleway-Regular.ttf')

                    console.log('data-------------------------', file)
                    let font = new FontFace('test-font', file);
                    await font.load();
                    document.fonts.add(font);
                    self.control.test.text.style.fontFamily = `test-font`;
                    console.log('############ ---------------- ###########', file)
                }
            },
            input: {
                upload: async (event) => {
                    // if (font)
                    //     document.fonts.remove(font);

                    const data = await event.currentTarget.files[0].arrayBuffer();

                    console.log('----------------------------', data)

                    function ab2str(buf) {
                        return String.fromCharCode.apply(null, new Uint16Array(buf));
                    }

                    function str2ab(str) {
                        var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
                        var bufView = new Uint16Array(buf);
                        for (var i=0, strLen=str.length; i<strLen; i++) {
                            bufView[i] = str.charCodeAt(i);
                        }
                        return buf;
                    }

                    const arr = new Uint8Array(data);

                    var decoded = ab2str(data);
                    var encoded  = str2ab(decoded)

                    console.log('data-------------------------', data, arr)
                    let font = new FontFace('test-font', arr);
                    await font.load();
                    document.fonts.add(font);
                    self.control.test.text.style.fontFamily = `test-font`;
                }
            },
        });
    });
};

export default {
    description: 'action'
};