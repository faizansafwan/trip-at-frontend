import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to post travel data
export const postTravel = createAsyncThunk(
    'travel/postTravel',
    async (travelData, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/travel`, travelData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
    }
);

// Thunk to fetch travel data
export const fetchTravel = createAsyncThunk(
    'travel/fetchTravel',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/travel`);
            return response.data;
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
    }
);

const travelSlice = createSlice({
    name: 'travel',
    initialState: {
        travel: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle postTravel actions
            .addCase(postTravel.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(postTravel.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.travel = action.payload;
                
            })
            .addCase(postTravel.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                
            })
            // Handle fetchTravel actions
            .addCase(fetchTravel.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTravel.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.travel = action.payload;
                state.error = null;
            })
            .addCase(fetchTravel.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default travelSlice.reducer;
