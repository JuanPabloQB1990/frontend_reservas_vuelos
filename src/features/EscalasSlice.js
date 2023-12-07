import {createSlice} from '@reduxjs/toolkit'

const initialScales = {
    escalas : []
}

export const scaleSlice = createSlice({
    name:"scales",
    initialState:initialScales,
    reducers: {
        addScales: (state, action) => {
            state.escalas = action.payload;
        }
    }
})

export const {addScales} = scaleSlice.actions
export default scaleSlice.reducer