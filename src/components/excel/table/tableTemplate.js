import { defaultStyles } from "../../../constants"
import { parse } from "../../../core/parse"
import { toInlineStyles } from "../../../core/utils"

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

const CODES = {
    A: 65,
    Z: 90
}

// function toCell(row,col, val) {
    
//     return `
//         <div class="cell" contenteditable data-col="${col} data-row="${row}"> 
//          ${val}
//         </div>
//     `
// }

function getWidth(colState, index) {
    return (colState[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(rowState, index) {
    // console.log(rowState)
    return (rowState[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(state, row) {
    
    return  function(_, col) {
        const id = `${row}:${col}`
        const width = getWidth(state.colState, col)
        let data = state.dataState[id] || ''
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id],
        })
        // if(dataState) {
        //      data = dataState[id] || ''
        // }
        
        return `<div class="cell" 
        contenteditable data-col="${col}"
        data-type="cell" 
        data-id="${id}"
        data-value="${data || ''}"
        style="${styles}; width: ${width}">
        ${parse(data) || ''}
        </div>`
    }
}

function toColumn({col, index, width}) {
    return `
        <div class="column" 
        data-type="resizable"
        data-col="${index}" 
        style="width:${width}"> 
            ${col}
            <div class="col-resize" data-resize="col"></div> 
        </div>
    `
}

function createRow(index, content, rowState) {
    const resize = index ? '<div class="row-resize" data-resize="row" ></div>' : ''
    const height = getHeight(rowState, index)
    return `
        <div class="row" data-type="resizable" data-row="${index}" style="height:${height}">
            <div class="row__info">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row__data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}


function withWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}

export function createTable(rowsCount = 10, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        // Сокращенная запись
        // .map(el => createCol(el))
        
        // .map( (col, index) => {
        //     const width = getWidth(state.colState, index)
        //     return toColumn(col, index, width)
        // })
        .map(withWidthFrom(state))
        .map(toColumn)
        .join('')

    
    rows.push(createRow(null, cols, {}))

   
    

    for(let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
        .fill('')
        // .map( (val, col) => toCell(row, col, val))
        .map(toCell(state, row))
        .join('')

        rows.push(createRow(row + 1, cells, state.rowState))
    }
    return rows.join('')
}