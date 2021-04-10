import { $ } from "../../core/dom"
import { Emitter } from "../../core/Emitter"
import { StoreSubscriber } from "../../core/StoreSubscriber"
import { preventDefault } from "../../core/utils"
import { updateDate } from "../../redux/actions"

export class Excel {
    constructor(options) {

        // Получаем список компонент
        this.components = options.components || []


        this.store = options.store

        // Создается экземпляр подписчика для Excel
        this.emitter = new Emitter()

        this.subscriber = new StoreSubscriber(this.store)
    }

    getRoot() {
        const $root = $.create('div', 'excel')

        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        }

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            
            // DEBUG START
            // if (component.name) {
            //     window['c' + component.name] = component
            // }
            // DEBUG END
            
            $el.html(component.toHTML()) 
            $root.append($el)
            return component
        });
        return  $root

    }

    init() {
        // this.$el.insertAdjacentHTML('afterbegin', '<h1> Hello </h1>')
        // const node = document.createElement('h1')
        // node.textContent = 'Test'
        console.log(process.env.NODE_ENV)
        if (process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', preventDefault)
        }
        this.store.dispatch(updateDate())
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component => component.init());
    }

    destroy() {
        this.subscriber.unsubscribeFromStore()
        this.components.forEach(component => component.destroy());
        document.removeEventListener('contextmenu', preventDefault)
    }

}