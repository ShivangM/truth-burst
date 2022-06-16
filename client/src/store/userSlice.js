import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: { user: {name: "", room: "", id: "", role: ""}, activeUsers: [], socket: {} },
    reducers: {
        setUser(state, action){
            state.user = action.payload
        },
        setActiveUser(state, action){
            state.activeUsers = action.payload
        },
        setSocket(state, action){
            state.socket = action.payload
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice