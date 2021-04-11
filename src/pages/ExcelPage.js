import { Header} from "../components/excel/header/Header";
import { Toolbar} from "../components/excel/toolbar/Toolbar";
import { Formula} from "../components/excel/formula/Formula";
import { Table} from "../components/excel/table/Table";
import { createStore } from "../core/createStore";
import { Page } from "../core/Page/Page";
import { storage } from "../core/utils";
import { rootReducer } from "../redux/rootReducer";
import {Excel} from "../components/excel/Excel"
import {normalizeInitialState} from "./../redux/initialState"
import { StateProcessor } from "../core/Page/StateProcessor";
import { LocalStorageClient } from "../shared/LocalStorageClient";

export class ExcelPage extends Page {

    constructor(param) {
        super(param)
        this.storeSub = null
        this.processor = new StateProcessor(
            new LocalStorageClient(this.params)
        )
    }
    async getRoot() {
        // const params = this.params ? this.params : Date.now().toString()
        // const state = storage(storageName(params))
        // const store = createStore(rootReducer, normalizeInitialState(state))

        const state = await this.processor.get()
        const initialState = normalizeInitialState(state)
        const store = createStore(rootReducer, initialState)
        
        // const stateListener = debounce(state => {
        //     // console.log('State', store.getState())
        //     storage(storageName(params), state)
        // }, 300)

        this.storeSub = store.subscribe(this.processor.listen)

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
        this.storeSub.unsubscribe()
    }

}