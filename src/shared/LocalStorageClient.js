import {storageName} from './../core/utils'
import {storage} from './../core/utils'

export class LocalStorageClient {
    constructor(name) {
        this.name = storageName(name)
    }

    save(state) {
        storage(this.name, state)
        return Promise.resolve()
    }
    

    get() {
        return new Promise(resolve => {
            const state = storage(this.name)

            setTimeout( ()=> {
                resolve()
            }, 3000)
        })
        // return Promise.resolve(storage(this.name))
    }
}