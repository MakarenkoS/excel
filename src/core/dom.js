// Утилиты для упрощения работы с DOM деревом

class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    // set text(text) {
    //     this.$el.textContent = text
    // }

    // get text() {
    //     return this.$el.textContent
    // }

    text(text) {
        if(typeof text === 'string') {
            this.$el.textContent = text
            return this
        }
        if(this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        } 
        return this.$el.textContent.trim()
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    clear() {
        this.html('')
        return this
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }

        return this
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    get data() {
        return this.$el.dataset
    }

    findAll(selector) {
        return this.$el.
        querySelectorAll(selector)
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    focus() {
        this.$el.focus()
        return this
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }

    id(parse) {
        if (parse) {
            const [row, col] = this.id().split(':')
            return {
                row: +row,
                col: +col
            }
        }
        return this.data.id
    }

    css(styles = {}) {

        // Устаревший метод hasOwnProperty и цикл for..in пробегает по свойствам прототипа объекта
        // for (const key in styles) {
        //     if (styles.hasOwnProperty(key)) {
        //         console.log(key)
        //         console.log(styles[key])
        //     }
        // }

        Object
            .keys(styles)
            .forEach(key => this.$el.style[key] = styles[key]
        )
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {

    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }

    return $(el)
}