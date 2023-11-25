import { IUser } from '@/types/user.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { login, register } from './user.actions'

interface IUserState {
	isLoading: boolean
	error: string
	user: IUser | null
	isAuthenticated: boolean
}

const initialState: IUserState = {
	isLoading: false,
	error: '',
	user: null,
	isAuthenticated: false,
}

export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload
			state.isAuthenticated = true
			localStorage.setItem('user', JSON.stringify(action.payload))
		},
		logout: state => {
			state.user = null
			state.isAuthenticated = false
			localStorage.removeItem('user')
		},
	},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload
				localStorage.setItem('user', JSON.stringify(action.payload))
				state.isAuthenticated = true
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.error = String(action.payload)
				state.user = null
				localStorage.removeItem('user')
				state.isAuthenticated = false
			})
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload
				localStorage.setItem('user', JSON.stringify(action.payload))
				state.isAuthenticated = true
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.error = String(action.payload)
				state.user = null
				localStorage.removeItem('user')
				state.isAuthenticated = false
			})
	},
})

export const userActions = userSlice.actions
