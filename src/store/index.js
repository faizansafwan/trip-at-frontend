import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import travelReducer from './travelSlice';
import contactReducer from './contactSlice';
import budgetReducer from './budgetSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        travel: travelReducer,
        contact: contactReducer,
        budget: budgetReducer,
    },
});

export default store;