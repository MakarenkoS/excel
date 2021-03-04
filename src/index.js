import { Excel } from './components/excel/Excel.js';
import { Formula } from './components/excel/formula/Formula.js';
import { Header } from './components/excel/header/Header.js';
import { Table } from './components/excel/table/Table.js';
import { Toolbar } from './components/excel/toolbar/Toolbar.js';
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
