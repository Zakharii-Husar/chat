import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface UserState {
    email: string
    fullName: string
    nickName: string
    password: string
    confirm: string
}
interface RegisterState extends UserState {
    validationErrors: UserState;
}

// Define the initial state using that type
const initialState: RegisterState = {
    email: "",
    fullName: "",
    nickName: "",
    password: "",
    confirm: "",
    validationErrors: {
        email: "",
        fullName: "",
        nickName: "",
        password: "",
        confirm: ""
    }
}

export const registerSlice = createSlice({
    name: 'registerSlice',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setFullName: (state, action: PayloadAction<string>) => {
            state.fullName = action.payload
        },
        setNickName: (state, action: PayloadAction<string>) => {
            state.nickName = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        setConfirm: (state, action: PayloadAction<string>) => {
            state.confirm = action.payload
        },
        setEmailErr: (state, action: PayloadAction<string>) => {
            state.validationErrors.email = action.payload
        },
        setFullNameErr: (state, action: PayloadAction<string>) => {
            state.validationErrors.fullName = action.payload
        },
        setNickNameErr: (state, action: PayloadAction<string>) => {
            state.validationErrors.nickName = action.payload
        },
        setPasswordErr: (state, action: PayloadAction<string>) => {
            state.validationErrors.password = action.payload
        },
        setConfirmErr: (state, action: PayloadAction<string>) => {
            state.validationErrors.confirm = action.payload
        },
    },
})

export const { setEmail, setFullName, setNickName,  setPassword, setConfirm,
    setEmailErr, setFullNameErr, setNickNameErr,  setPasswordErr, setConfirmErr, } = registerSlice.actions

export default registerSlice.reducer