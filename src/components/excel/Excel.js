import { $ } from "../../core/dom"
import { Emitter } from "../../core/Emitter"

export class Excel {
    constructor(selector, options) {
        // Селектор для основного div
        this.$el = $(selector)

        // Получаем список компонент
        this.components = options.components || []

        // Создается экземпляр подписчика для Excel
        this.emitter = new Emitter()
    }

    getRoot() {
        const $root = $.create('div', 'excel')

        const componentOptions = {
            emitter: this.emitter
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

    render() {
        // this.$el.insertAdjacentHTML('afterbegin', '<h1> Hello </h1>')
        // const node = document.createElement('h1')
        // node.textContent = 'Test'
        this.$el.append(this.getRoot())
        this.components.forEach(component => component.init());
    }

    destroy() {
        this.components.forEach(component => component.destroy());
    }

}