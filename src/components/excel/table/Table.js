import { ExcelComponent } from "../../../core/ExcelComponent"
import { $ } from "../../../core/dom";
import { createTable } from "./tableTemplate"
import { resizeHandler } from "./tableResize";
import { isCell, matrix, shouldResize, nextSelector } from "./table.function";
import { TableSelection } from "./Table.selection";


export class Table extends ExcelComponent {
    static className = 'excel__table'

    onDragStart = false;

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input', 'click'],
            ...options
        })
    }

    toHTML() {
        return createTable(15)
    }

    prepare() {
        console.log('prepare')
    }

    init() {
        super.init()
        console.log('init')

        this.selection = new TableSelection()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)

        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })

        this.$on('formula:keyDone', () => {
            this.selection.current.focus()
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }

    onMousedown(event) {

        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                //group
                const $cells = matrix($target, this.selection.current)
                    .map((id) => {
                        return this.$root.find(`[data-id="${id}"]`)
                    })

                this.selection.selectGroup($cells)

            } else {
                // single
                this.selection.select($target)
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowDown',
            'ArrowRight',
            'ArrowUp'
        ]

        const { key } = event
        if (keys.includes(key) & !event.shiftKey) {
            event.preventDefault()
            console.log(key)

            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selectCell($next)
        }

    }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }

    onClick(event) {
        if (isCell(event)) {
            this.$emit('table:click', $(event.target))
        }

    }
}



