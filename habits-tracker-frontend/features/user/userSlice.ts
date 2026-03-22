import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchRegisterUser, fetchLoginUser } from "./userAPI";

interface userThunk {
  username: string;
  password: string;
}

type user = {
  user: string;
  token: string;
};

type userState = {
  user: user | null;
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
};

// Estado inicial
const initialState: userState = {
  user: null,
  status: "idle",
  error: null,
};

// REGISTER
export const fetchRegisterUserThunk = createAsyncThunk(
  "user/fetchRegisterUser",
  async ({ username, password }: userThunk, { rejectWithValue }) => {
    const response = await fetchRegisterUser(username, password);
    const responseJson = await response.json();

    if (!response.ok) {
      return rejectWithValue("Failed to register user");
    }

    if (responseJson.message === "Usuario registrado correctamente") {
      return responseJson.message;
    }

    return rejectWithValue(responseJson.message);
  }
);

// LOGIN
export const fetchLoginUserThunk = createAsyncThunk(
  "user/fetchLoginUser",
  async ({ username, password }: userThunk, { rejectWithValue }) => {
    const response = await fetchLoginUser(username, password);
    const responseJson = await response.json();

    if (!response.ok) {
      return rejectWithValue("Failed to login user");
    }

    if (responseJson.message === "Inicio de sesion exitoso") {
      
      localStorage.setItem("token", responseJson.token);

      return responseJson;
    }

    return rejectWithValue(responseJson.message);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {

    // REGISTER
    builder.addCase(fetchRegisterUserThunk.fulfilled, (state, action) => {
      state.status = "success";
      state.error = action.payload as string;
      alert("Usuario registrado correctamente");
    });

    builder.addCase(fetchRegisterUserThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
      alert("No es posible registrar el usuario en este momento");
    });

    // LOGIN
    builder.addCase(fetchLoginUserThunk.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload as user;
      state.error = null;
    });

    builder.addCase(fetchLoginUserThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
      alert("No es posible iniciar sesion en este momento");
    });
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;