import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {


    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
    }

    // Метод toHTML возвращает шаблон компонента
    toHTML () {
        return '<h2>  </h2>'
    }

    init() {
        this.initDOMListeners()
       
    }

    destroy() {
        this.removeDOMListeners()
    }
}