import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface IRequest {
  usernameOrEmail: string | null;
  password: string | null;
}

interface IResponse {
  id: number | null;
  nickName: string | null;
  email: string | null,
  fullName: string | null
}

interface IAuthState {
  request: IRequest;
  response: IResponse;
}

const initialState: IAuthState = {
  request: {
    usernameOrEmail: null,
    password: null,
  },
  response: {
    id: null,
    nickName: null,
    email: null,
    fullName: null
  },
};

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    try {
      const response = await fetch("http://localhost:5190/api/SignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserNameOrEmail: state.auth.request.usernameOrEmail,
          Password: state.auth.request.password,
        }),
        credentials: "include",
      });

      if(response.ok){
        const data = await response.json();
        dispatch(authSlice.actions.setResponse(data));
        return data;
      }
      
    } catch (error) {
      console.error(error);
    }
  }
);

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      state.request.usernameOrEmail = action.payload; 
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.request.password = action.payload;
    },
    setResponse: (state, action: PayloadAction<IResponse>) => {
      state.response = action.payload;
    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(loginAsync.fulfilled, (state, action) => {

  //     console.log(action.payload);
  //   });
  // },
});

export const { setLogin, setPassword, setResponse } = authSlice.actions;

export default authSlice.reducer;
