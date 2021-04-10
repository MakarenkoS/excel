import {Router} from './core/routes/Router'
import './module.js';
import '/scss/index.scss';
import { DashboardPage } from './pages/DashboardPage.js';
import { ExcelPage } from './pages/ExcelPage.js';

console.log('Begin')

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
})

// const store = createStore(rootReducer, initialState)

// const stateListener = debounce(state => {
//     console.log('State', store.getState())
//     storage('excel-state', state)
// }, 300)

// store.subscribe(stateListener)

// const excel = new Excel('#app', {
//     components: [
//         Header,
//         Toolbar,
//         Formula,
//         Table
//     ],
//     store
// })

// excel.render()


// Observer Test

// const emitter = new Emitter()

// const unsub = emitter.subscribe('someEvent', data => console.log('Sub', data))

// emitter.emit('someEvent', 42)

// setTimeout(()=> emitter.emit('someEvent', '2 seconds'), 2000)

// setTimeout(()=> unsub(), 3000)

// setTimeout(()=> emitter.emit('someEvent', '4 seconds'), 4000)
