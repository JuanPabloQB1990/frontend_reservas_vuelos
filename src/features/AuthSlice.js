import {createSlice} from '@reduxjs/toolkit'

const initialAuth = {
    token:"",
    rol:""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuth,
    reducers : {
        addToken: (state, action) => {
            state.token = action.payload.accesToken,
            state.rol = action.payload.rol
        }
    }
})

export const {addToken} = authSlice.actions
export default authSlice.reducer