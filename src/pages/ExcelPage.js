import { Header} from "../components/excel/header/Header";
import { Toolbar} from "../components/excel/toolbar/Toolbar";
import { Formula} from "../components/excel/formula/Formula";
import { Table} from "../components/excel/table/Table";
import { createStore } from "../core/createStore";
import { Page } from "../core/Page";
import { debounce, storage } from "../core/utils";
import { rootReducer } from "../redux/rootReducer";
import {Excel} from "../components/excel/Excel"
import {normalizeInitialState} from "./../redux/initialState"

function storageName(param) {
    return 'excel:' + param
}


export class ExcelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString()

        const state = storage(storageName(params))
        const store = createStore(rootReducer, normalizeInitialState(state))
        
        const stateListener = debounce(state => {
            // console.log('State', store.getState())
            storage(storageName(params), state)
        }, 300)

        store.subscribe(stateListener)

        this.excel = new Excel( {
            components: [
                Header,
                Toolbar,
                Formula,
                Table
            ],
            store
        })

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
    }

}