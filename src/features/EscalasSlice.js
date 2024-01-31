import {createSlice} from '@reduxjs/toolkit'

const initialScales = {
    escalas : [],
    formBusqueda: {}
}

export const scaleSlice = createSlice({
    name:"scales",
    initialState:initialScales,
    reducers: {
        addScales: (state, action) => {
            state.escalas = action.payload;
        },
        addFormBusqueda: (state, action) => {
            state.formBusqueda = action.payload;
        },
        deleteEscalas: (state, action) => {
            state.escalas = []
        }
    }
})

export const {addScales, addFormBusqueda, deleteEscalas} = scaleSlice.actions
export default scaleSlice.reducer