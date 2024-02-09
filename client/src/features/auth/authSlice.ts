import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface Request {
  email: string
  password: string
}

interface Response {
  id: number | null
  nickName: string | null
}

interface AuthState {
  request: Request
  response: Response
}



// Define the initial state using that type
const initialState: AuthState = {
  request: {
    email: "",
    password: "",
  },
  response: {
    id: null,
    nickName: null
  }
}

export const loginAsync = createAsyncThunk('auth/login', async ({ email, password }:Request) => {

  return {
    id: 1,
    nickName: "Zakharii"
  };
});

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      state.request.email = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.request.password = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      const { id, nickName } = action.payload;
      state.response = {id: id, nickName: nickName} as Response;
    });
    // handle other login-related actions if needed
  },
})

export const { setLogin, setPassword } = authSlice.actions

export default authSlice.reducer