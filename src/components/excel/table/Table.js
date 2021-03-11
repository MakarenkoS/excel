import { ExcelComponent } from "../../../core/ExcelComponent"
import { createTable } from "./tableTemplate"
import { resizeHandler } from "./tableResize";
import { shouldResize } from "./table.function";

export class Table extends ExcelComponent {
    static className = 'excel__table'

    onDragStart = false;

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable(15)
    }

    onMousedown(event) {

        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        }
    }




}

// 365 ms  Scripting
// 2325 ms  Rendering
// 878 ms  Painting