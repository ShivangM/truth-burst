import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: { user: { name: "", room: "", id: "" }, activeUsers: [], socket: null, selected: "", disabled: false },
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        setActiveUser(state, action) {
            state.activeUsers = action.payload
        },
        setSocket(state, action) {
            state.socket = action.payload
        },
        setSelected(state, action) {
            state.selected = action.payload
        },
        setDisabled(state, action) {
            state.disabled = action.payload
        },
    }
})

export const userActions = userSlice.actions;
export default userSlice