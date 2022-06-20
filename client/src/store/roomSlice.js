import { createSlice } from "@reduxjs/toolkit"

const roomSlice = createSlice({
    name: "room",
    initialState: {roomData: {}, question: "", roundNumber: 0, answers: [], votes: []},
    reducers: {
        setRoomData(state, action){
            state.roomData = action.payload
        },
        setQuestion(state, action){
            state.question = action.payload
        },
        setRoundNumber(state, action){
            state.roundNumber = action.payload
        },
        setAnswers(state, action){
            state.answers = action.payload
        },
        setVotes(state, action){
            state.votes = action.payload
        },
    }
})

export const roomActions = roomSlice.actions;
export default roomSlice