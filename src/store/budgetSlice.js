import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postBudget = createAsyncThunk( 'budget/postBudget', async (budget, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/budget`, budget);
        return response.data;
    } 
    catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
});


export const fetchBudget = createAsyncThunk('budget/fetchBudget', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/budget`);
        console.log("API Response: ", response.data); // For debugging
        return response.data.data; // Adjust as per your API
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
});

 

const budgetSlice = createSlice({
    name: 'budget',
    initialState: {
        budget: [], // Ensure this is an array
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBudget.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBudget.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.budget = action.payload; // Ensure it's an array
            })
            .addCase(fetchBudget.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});




export default budgetSlice.reducer;