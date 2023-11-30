import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './api/api'
import { notesSlice } from './notes/notes.slice'
import { userSlice } from './user/user.slice'

const reducers = combineReducers({
	[api.reducerPath]: api.reducer,
	user: userSlice.reducer,
	notes: notesSlice.reducer,
})

export const store = configureStore({
	reducer: reducers,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
