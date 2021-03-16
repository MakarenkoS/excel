import { Excel } from './components/excel/Excel.js';
import { Formula } from './components/excel/formula/Formula.js';
import { Header } from './components/excel/header/Header.js';
import { Table } from './components/excel/table/Table.js';
import { Toolbar } from './components/excel/toolbar/Toolbar.js';
import { Emitter } from './core/Emitter.js';
import './module.js';
import '/scss/index.scss';

console.log('Begin')


const excel = new Excel('#app', {
    components: [
        Header,
        Toolbar,
        Formula,
        Table
    ]
})

excel.render()


// Observer Test

// const emitter = new Emitter()

// const unsub = emitter.subscribe('someEvent', data => console.log('Sub', data))

// emitter.emit('someEvent', 42)

// setTimeout(()=> emitter.emit('someEvent', '2 seconds'), 2000)

// setTimeout(()=> unsub(), 3000)

// setTimeout(()=> emitter.emit('someEvent', '4 seconds'), 4000)
