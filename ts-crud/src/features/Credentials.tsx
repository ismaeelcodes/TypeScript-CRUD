import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startState } from "../interfaces";
// Importing our initialState interface


// Initializing state.
const initialState: startState = {
    value: {
   name: '',
   pass: '',
},
}

export const credentialSlice = createSlice({
    name: 'credentials',
    initialState,
    reducers: {
        // sets the state to the payload recieved by the register form which can be logged into.
        addUser: (state, action: PayloadAction<{name: string; pass: string;}>) => {
            state.value.name = action.payload.name
            state.value.pass = action.payload.pass
        }
    }
})

// exporting our functions
export const { addUser } = credentialSlice.actions;
export default credentialSlice.reducer;