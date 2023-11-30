import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface INotesState {
	currentPage: number
	limit: number
}

const initialState: INotesState = {
	currentPage: 1,
	limit: 2,
}

export const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},
		setLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload
		},
	},
})

export const notesActions = notesSlice.actions
