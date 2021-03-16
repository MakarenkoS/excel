import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {


    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.prepare()
        this.unsubscribers = []
    }

    // Настройка компонента до инициализации
    prepare() {

    }

    // Метод toHTML возвращает шаблон компонента
    toHTML() {
        return '<h2>  </h2>'
    }

    // Уведомляем subscribers про event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    // Подписка на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    // Инициализация. Добавление слушателей    
    init() {
        this.initDOMListeners()

    }

    // Удаление слушателей
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}