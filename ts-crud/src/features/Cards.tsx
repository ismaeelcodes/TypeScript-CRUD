import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Car } from "../interfaces";
import { registerCarsData } from "../Data";
// Importing Data and our State Interface.


// initializing State with our Interface.
const initialState: {
    value: Car[]
} = {
    value: registerCarsData
}

export const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        // Takes an action with a payload of the same structure of the Car Interface.
        addCard: (state, action: PayloadAction<Car>) => {
            // Pushes such structure into our state.
            state.value.push(action.payload);
          },
          // Takes an action with a payload of a number.
        deleteCard: (state, action: PayloadAction<number>) => {
            // filters out every non-matching entry, deleting the matching one.
            state.value = state.value.filter((card) => card.id !== action.payload);
        },
        // Takes an action with a  payload of the same structure of our Imported interface.
        updateCard: (state, action: PayloadAction<Car>) => {
            // Destructures the payload into ID, RegNo, Color, Model, Make
            const { id, registrationNumber, color, model, make } = action.payload;
            // Tries to find the card in our Data with the same id that we have destructured and stores it in "card"
            const card = state.value.find((card) => card.id === id);
            // If there is a matching id, sets it's values to the newly updated ones and updates our existing card.
            if (card) {
              card.registrationNumber = registrationNumber;
              card.color = color;
              card.model = model;
              card.make = make;
            }
        },
    
    }
})

// exporting functions
export const { addCard, deleteCard, updateCard } = cardSlice.actions
export default cardSlice.reducer;