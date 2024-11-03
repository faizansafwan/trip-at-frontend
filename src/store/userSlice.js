// src/store/userSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createUser = createAsyncThunk(
    'user/createUser',
    async (userdata, thunkAPI) => {
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
            const response = await axios.post(`${backendUrl}/api/user`, userdata);
            return response.data;
        } catch (error) {
            console.log("Error response:", error.response); 
            const errorMsg = error.response?.data || 'Something went wrong';
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                console.log("loading", process.env.REACT_APP_BACKEND_URL);
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                console.log("successful");
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                // console.log();
            });
    },
});

export default userSlice.reducer;
