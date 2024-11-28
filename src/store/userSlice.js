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

export const userLogin = createAsyncThunk( 'user/userLogin', async (logindata, thunkAPI) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, logindata);
        
        const { token } = response.data;

        if (token) {
            localStorage.setItem( 'token', token);
        }
        return response.data;
  
    }
    catch (error) {
        const errorMsg = error.response?.data || 'Something went wrong';
        return thunkAPI.rejectWithValue(errorMsg);
    }
});

export const currentUser =createAsyncThunk( 'user/currentUser', async (_, thunkAPI) => {

    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    }
    catch (error) {
        const errorMsg = error.response?.data.message || "Failed to fetch profile";
        return thunkAPI.rejectWithValue(errorMsg);
    }
});


export const updateUser = createAsyncThunk('user/updateUser', 
    async ({ email, firstName, lastName, profilePicture}, thunkAPI) => {

        try{
            const token = localStorage.getItem('token'); 

            const response = await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/api/user/update?email=${email}`, { firstName, lastName, profilePicture }, { 
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    } 
                }
            );

            return response.data.data;
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error.message || 'Error Occurred, Try again');
        }
    });

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user:  null,
        status: 'idle',
        error: null,
    },
    reducers: {
        signOut: (state) => {
            state.user = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })
            .addCase(userLogin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.token = action.payload;

                // localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(currentUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(currentUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(currentUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload; // Update the user with the new data
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; // Set the error message
            });
    },
});

export const { signOut } = userSlice.actions;
export default userSlice.reducer;
