export class Page {
    constructor(params) {
        this.params = params
    }

    getRott() {
        throw new Error('Method "getRoot" should be implemented')
    }


    afterRender() {
        
    }

    destroy() {

    }
}