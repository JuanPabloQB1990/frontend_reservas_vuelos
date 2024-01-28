import {createSlice} from '@reduxjs/toolkit'

const initialAuth = {
    token:"",
    rol:"",
    idCliente: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuth,
    reducers : {
        addToken: (state, action) => {
            state.token = action.payload.accesToken,
            state.rol = action.payload.rol,
            state.idCliente = action.payload.idCliente
        },
        deleteToken: (state, action) => {
            state.token = "",
            state.rol = ""
        }
    }
})

export const {addToken, deleteToken} = authSlice.actions
export default authSlice.reducer