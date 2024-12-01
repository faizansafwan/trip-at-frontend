import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import travelReducer from './travelSlice';
import contactReducer from './contactSlice';
import budgetReducer from './budgetSlice';
import accomadationReducer from './AccomadationSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        travel: travelReducer,
        contact: contactReducer,
        budget: budgetReducer,
        accomadation: accomadationReducer,
    },
});

export default store;