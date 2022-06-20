import { configureStore } from "@reduxjs/toolkit";
import messageSlice from "./messageSlice";
import roomSlice from "./roomSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        user : userSlice.reducer,
        messages: messageSlice.reducer,
        room: roomSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store