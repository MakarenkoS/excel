import { Excel } from './components/excel/Excel.js';
import { Formula } from './components/excel/formula/Formula.js';
import { Header } from './components/excel/header/Header.js';
import { Table } from './components/excel/table/Table.js';
import { Toolbar } from './components/excel/toolbar/Toolbar.js';
import { createStore } from './core/createStore.js';
import { storage, debounce } from './core/utils.js';
import './module.js';
import { initialState } from './redux/initialState.js';
import { rootReducer } from './redux/rootReducer.js';
import '/scss/index.scss';

console.log('Begin')

const store = createStore(rootReducer, initialState)

const stateListener = debounce(state => {
    console.log('State', store.getState())
    storage('excel-state', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
    components: [
        Header,
        Toolbar,
        Formula,
        Table
    ],
    store
})

excel.render()


// Observer Test

// const emitter = new Emitter()

// const unsub = emitter.subscribe('someEvent', data => console.log('Sub', data))

// emitter.emit('someEvent', 42)

// setTimeout(()=> emitter.emit('someEvent', '2 seconds'), 2000)

// setTimeout(()=> unsub(), 3000)

// setTimeout(()=> emitter.emit('someEvent', '4 seconds'), 4000)
