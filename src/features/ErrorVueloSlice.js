import {createSlice} from '@reduxjs/toolkit'

const initialError = {
    errorMessage : ""
}

export const errorSlice = createSlice({
    name:"error",
    initialState: initialError,
    reducers: {
        addError: (state, action) => {
            state.errorMessage = action.payload;
        }
    }
})

export const {addError} = errorSlice.actions
export default errorSlice.reducer