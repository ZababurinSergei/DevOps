import http from "../common/http";
const basePath = './mock';

const nkMemory = document.body.querySelector('nk-memory')

const api = {
    getFolderTree() {
        console.log('getFolderTree', new URL(`${basePath}/folderTree.json`, import.meta.url))
        return http.get(new URL(`${basePath}/folderTree.json`, import.meta.url).pathname);
    },

    search(value: string) {
        return http.get(new URL(`${basePath}/folderTree.json`, import.meta.url).pathname, { query: value });
    },

    getDataSource() {
        return http.get(new URL(`${basePath}/dataSource.json`, import.meta.url).pathname);
    },

    getDataSourceById(sourceId: string): Promise<DataSourceType> {
        return new Promise<DataSourceType>((resolve, reject) => {
            const mockDataSource: DataSourceType = {
                id: sourceId,
                name: `dataSource` + sourceId,
                type: 'MySQL',
                jdbcUrl: 'http://jdbc:127.0.0.1//3306',
                updateTime: Date.now() + ''
            }
            resolve(mockDataSource)
        });
    },

    createDataSource(dataSource: Omit<DataSourceType, 'id'>) {
        return new Promise((resolve, reject) => {
            resolve({
                code: 200,
                message: 'success',
                data: dataSource
            })
        });
    },

    async query(query: string = '') {
        const res = await http.get(`${basePath}/folderTree.json`);
        const result: any[] = [];
        const search = (nodeItem: any) => {
            if (!nodeItem) return;
            const target = nodeItem.name || '';
            if (target.includes(query) || query.includes(target)) {
                result.push(nodeItem);
            }
            if (nodeItem.children) {
                nodeItem.children.forEach((item: any) => { search(item) })
            }
        }
        search(res.data);

        return result;
    }
}

// @ts-ignore
nkMemory.onLoad = () => {

    debugger
// @ts-ignore
    nkMemory.on("nk-memory", (event: any) => {
        console.log('========= NK MEMORY =========', event)
    });

// @ts-ignore
    nkMemory.trigger("nk-memory", {
        type:'init',
        self: nkMemory,
        memory: [nkMemory]
    });
}

export default api;