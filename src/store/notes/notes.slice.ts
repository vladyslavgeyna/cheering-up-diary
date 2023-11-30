import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface INotesState {
	currentPage: number
	limit: number
	selectedCategory: string
	selectedOrderByOption: string
}

const initialState: INotesState = {
	currentPage: 1,
	limit: 2,
	selectedCategory: '',
	selectedOrderByOption: '',
}

export const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},
		setSelectedCategory: (state, action: PayloadAction<string>) => {
			state.selectedCategory = action.payload
		},
		setSelectedOrderByOption: (state, action: PayloadAction<string>) => {
			state.selectedOrderByOption = action.payload
		},
		setLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload
		},
	},
})

export const notesActions = notesSlice.actions
