import { configureStore } from '@reduxjs/toolkit'

// importing Reducers
import usersReducer from "./features/Credentials"
import cardsReducer from './features/Cards' 

export const store = configureStore({
  reducer: {
    // storing our Reducers in the storage.
    users: usersReducer,
    cards: cardsReducer,
  },
})


// exporting Types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch