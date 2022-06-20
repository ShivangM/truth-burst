import { createSlice } from "@reduxjs/toolkit"

const roomSlice = createSlice({
    name: "room",
    initialState: {roomData: {}, question: "", roundNumber: 0, answers: [], votes: [], loading: false, leaderboards: []},
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
        setLoading(state, action){
            state.loading = action.payload
        },
        setLeaderboards(state, action){
            state.leaderboards = action.payload
        },
    }
})

export const roomActions = roomSlice.actions;
export default roomSlice