import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  email: string | null;
  fullName: string | null;
  nickName: string | null;
  password: string | null;
  confirm: string | null;
}
export interface IRegisterState extends IUserState {
  validationErrors: IUserState;
}

const initialState: IRegisterState = {
  email: null,
  fullName: null,
  nickName: null,
  password: null,
  confirm: null,
  validationErrors: {
    email: null,
    fullName: null,
    nickName: null,
    password: null,
    confirm: null,
  },
};

export const registerSlice = createSlice({
  name: "registerSlice",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setFullName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload;
    },
    setNickName: (state, action: PayloadAction<string>) => {
      state.nickName = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirm: (state, action: PayloadAction<string>) => {
      state.confirm = action.payload;
    },
    setEmailErr: (state, action: PayloadAction<string>) => {
      state.validationErrors.email = action.payload;
    },
    setFullNameErr: (state, action: PayloadAction<string>) => {
      state.validationErrors.fullName = action.payload;
    },
    setNickNameErr: (state, action: PayloadAction<string>) => {
      state.validationErrors.nickName = action.payload;
    },
    setPasswordErr: (state, action: PayloadAction<string>) => {
      state.validationErrors.password = action.payload;
    },
    setConfirmErr: (state, action: PayloadAction<string>) => {
      state.validationErrors.confirm = action.payload;
    },
  },
});

export const {
  setEmail,
  setFullName,
  setNickName,
  setPassword,
  setConfirm,
  setEmailErr,
  setFullNameErr,
  setNickNameErr,
  setPasswordErr,
  setConfirmErr,
} = registerSlice.actions;

export default registerSlice.reducer;
