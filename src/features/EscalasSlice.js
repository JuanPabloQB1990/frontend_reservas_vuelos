import {createSlice} from '@reduxjs/toolkit'

const initialScales = {
    escalas : [],
    asientos: null
}

export const scaleSlice = createSlice({
    name:"scales",
    initialState:initialScales,
    reducers: {
        addScales: (state, action) => {
            state.escalas = action.payload;
        },
        addAsientos: (state, action) => {
            state.asientos = action.payload;
        }
    }
})

export const {addScales, addAsientos} = scaleSlice.actions
export default scaleSlice.reducer