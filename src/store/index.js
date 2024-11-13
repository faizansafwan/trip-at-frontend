import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import travelReducer from './travelSlice';
import contactReducer from './contactSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        travel: travelReducer,
        contact: contactReducer,
    },
});

export default store;