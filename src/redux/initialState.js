import { defaultStyles, defaultTitle } from "../constants"
import { clone, storage } from "../core/utils"

const defaultState = {
    title: defaultTitle,
    rowState: {},
    colState: {},
    dataState: {},  //{'0:1': 'text'}
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles,
    openedDate: new Date().toJSON()

}

// export const initialState = defaultState    

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})

// export const initialState = storage('excel-state')
//     ? normalize(storage('excel-state'))
//     : defaultState

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}

