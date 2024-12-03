

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postAccomadation = createAsyncThunk( 'accomadation/postAccomadation', async (accomadation, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/accomadation`, accomadation, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data.data;
    } 
    catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
});


export const fetchAccomadation = createAsyncThunk('accomadation/fetchAccomadation', async (_, {thunkAPI}) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/accomadation`);
        
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
});

export const fetchAccomadationById = createAsyncThunk('accomadation/fetchAccomadationById', async ( id, {thunkAPI}) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/accomadation/${id}`);
        
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
});

 

const accomadationSlice = createSlice({
    name: 'accomadation',
    initialState: {
        accomadation: [], // Ensure this is an array
        post: null,
        selectedAccommodation: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccomadation.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAccomadation.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.accomadation = action.payload; // Ensure it's an array
            })
            .addCase(fetchAccomadation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(postAccomadation.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postAccomadation.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.post = action.payload; 
            })
            .addCase(postAccomadation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchAccomadationById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAccomadationById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedAccommodation = action.payload; 
            })
            .addCase(fetchAccomadationById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});




export default accomadationSlice.reducer;