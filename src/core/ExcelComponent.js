import { DomListener } from './DomListener';

export class ExcelComponent extends DomListener {


    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.store = options.store
        this.prepare()
        this.unsubscribers = []
        this.subscribe = options.subscribe || []
        // this.storeSub = null
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

    $dispatch(action) {
        this.store.dispatch(action)
    }

    // Сюда приходят только изменения по полям, на которые подписались
    storeChanged() {

    }

    isWatching(key) {
        return this.subscribe.includes(key)
    }

    // $subscribe(fn) {
    //     this.storeSub = this.store.subscribe(fn)
    // }

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
        // this.storeSub.unsubscribe()
    }
}