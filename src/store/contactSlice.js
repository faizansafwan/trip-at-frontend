// features/contactSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for creating a contact
export const createContact = createAsyncThunk(
  "contact/createContact",
  async (contactData, thunkAPI) => {
    try {
      const response = await axios.post("/api/contact", contactData);
      return response.data; // Returns the created contact object
    } catch (error) {
      // Handle error and pass a custom error message to the rejected action
      return thunkAPI.rejectWithValue(error.response.data.message || "Failed to create contact");
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contact: null,
    error: null,
    status: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.status = 'loading';
        
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contact = action.payload;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Custom error message from rejectWithValue
      });
  },
});

export default contactSlice.reducer;
