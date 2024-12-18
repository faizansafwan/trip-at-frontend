import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postBudget = createAsyncThunk( 'budget/postBudget', async (budget, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/budget`, budget, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } 
    catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
});


export const fetchBudgetById = createAsyncThunk('budget/fetchBudgetById', async (id, {thunkAPI}) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/budget/find/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        console.log("API Response: ", response.data); // For debugging
        return response.data.data; // Adjust as per your API
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
});

export const fetchBudgetByEmail = createAsyncThunk('budget/fetchBudgetByEmail', async (email, {thunkAPI}) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/budget/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        console.log("API Response: ", response.data); // For debugging
        return response.data.data; // Adjust as per your API
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
});

export const deleteBudget = createAsyncThunk('budget/deleteBudget', async (id, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/budget/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data; // Return the ID of the deleted budget
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
});
 

const budgetSlice = createSlice({
    name: 'budget',
    initialState: {
        budget: [], // Ensure this is an array
        selectedBudget: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBudgetById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBudgetById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedBudget = action.payload; // Ensure it's an array
            })
            .addCase(fetchBudgetById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(postBudget.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postBudget.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.budget = action.payload; // Ensure it's an array
            })
            .addCase(postBudget.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchBudgetByEmail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBudgetByEmail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.budget = action.payload; // Ensure it's an array
            })
            .addCase(fetchBudgetByEmail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteBudget.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteBudget.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Remove the deleted budget from the state
                state.budget = state.budget.filter((item) => item._id !== action.payload);
            })
            .addCase(deleteBudget.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});




export default budgetSlice.reducer;