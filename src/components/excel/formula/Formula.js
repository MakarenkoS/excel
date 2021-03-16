import { $ } from '../../../core/dom'
import { ExcelComponent } from '../../../core/ExcelComponent'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'
    
    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
    }

    toHTML() {
        return  `
        <div class="formula__info">fx</div>
        <div id="formula" class="formula__input" contenteditable="true" spellcheck="false"></div>
        `
    }

    init() {
        super.init()

        this.$formula = this.$root.find('#formula')
        this.$on('table:select', $cell => {
            this.$formula.text($cell.text())
        })

        this.$on('table:input', $cell => {
            this.$formula.text($cell.text())
        })

        this.$on('table:click', $cell => {
            this.$formula.text($cell.text())
        })
    }

    onInput(event) {
        const text = $(event.target).text()
        this.$emit('formula:input', text)
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab'
        ]

        const {key} = event
        if (keys.includes(key)) {
            
            switch (key) {
                case 'Enter':
                case 'Tab':
                    event.preventDefault()
                    this.$emit('formula:keyDone')
                default:
                    break
            }
        }
    

    }

 

}