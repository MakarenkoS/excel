import { $ } from "../../core/dom"

export class Excel {
    constructor(selector, options) {
        // Селектор для основного div
        this.$el = $(selector)

        // Получаем список компонент
        this.components = options.components || []
    }

    getRoot() {
        const $root = $.create('div', 'excel')

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el);
            
            // DEBUG START
            if (component.name) {
                window['c' + component.name] = component
            }
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

}