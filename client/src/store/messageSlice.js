import { createSlice } from "@reduxjs/toolkit"

const messageSlice = createSlice({
    name: "messages",
    initialState: {messages: []},
    reducers: {
        setMessage(state, action){
            const message = action.payload
            state.messages.push(message)
        }
    }
})

export const messageActions = messageSlice.actions;
export default messageSlice