import { ExcelComponent } from "../../../core/ExcelComponent"
import { $ } from "../../../core/dom";
import { createTable } from "./tableTemplate"
import { resizeHandler } from "./tableResize";
import { isCell, matrix, shouldResize, nextSelector } from "./table.function";
import { TableSelection } from "./Table.selection";
import { TABLE_RESIZE } from "../../../redux/types";
import * as actions from "../../../redux/actions";
import { defaultStyles } from "../../../constants";
import { parse } from "../../../core/parse";


export class Table extends ExcelComponent {
    static className = 'excel__table'

    onDragStart = false;

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input', 'click'],
            ...options
        })
        this.selection = new TableSelection()
    }

    toHTML() {
        return createTable(15, this.store.getState())
    }

    prepare() {
    }

    init() {
        super.init()

        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)

        this.$on('formula:input', value => {
            this.selection.current.attr('data-value', value)
            this.selection.current.text(parse(value))

            this.updateTextInStore(value)
        })

        this.$on('formula:keyDone', () => {
            this.selection.current.focus()
        })

        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })

        // this.$subscribe((state)=> {
        //     console.log('Formula State', state)
        // })

    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStyles(styles))
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('Resize error', e.message)
        }

    }

    onMousedown(event) {

        if (shouldResize(event)) {
            this.resizeTable(event)
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
                this.selectCell($target)
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

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(event) {
        // this.$emit('table:input', $(event.target))
        this.updateTextInStore($(event.target).text())

    }

    onClick(event) {
        if (isCell(event)) {
            this.$emit('table:click', $(event.target))
        }

    }
}



