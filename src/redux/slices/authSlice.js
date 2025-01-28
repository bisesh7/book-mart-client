// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for user sign up
export const signUp = createAsyncThunk("auth/signUp", async (userData) => {
  userData.roles = "ROLE_USER";

  try {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const newUser = await response.json();
    return newUser; // Assuming the response contains user information
  } catch (error) {
    throw error.message;
  }
});

// Async thunk for user login
export const login = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const response = await fetch("http://localhost:8080/auth/getToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    throw error.message;
  }
});

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
  token: null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action);

        state.loading = false;
        state.user = action.payload.username;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions
export const { logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
