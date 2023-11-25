import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../../config'
import { IUser } from './../../types/user.interface'

export const register = createAsyncThunk<IUser, IUser>(
	'user/register',
	async (userToRegister, thunkApi) => {
		try {
			const checkUserExistsResponse = await axios.get<IUser[]>(
				`${API_URL}/users?username=${userToRegister.username}`,
			)

			if (checkUserExistsResponse.data[0]) {
				return thunkApi.rejectWithValue(
					`User with username ${userToRegister.username} already exists`,
				)
			}

			const registerUserResponse = await axios.post<IUser>(
				`${API_URL}/users`,
				{
					...userToRegister,
				},
			)

			console.log('registerUserResponse.data', registerUserResponse.data)

			return registerUserResponse.data
		} catch (e) {
			if (axios.isAxiosError(e)) {
				return thunkApi.rejectWithValue(e.message)
			} else {
				return thunkApi.rejectWithValue('An unexpected error occurred')
			}
		}
	},
)

export const login = createAsyncThunk<IUser, IUser>(
	'user/login',
	async (userToLogin, thunkApi) => {
		try {
			const checkUserExistsResponse = await axios.get<IUser[]>(
				`${API_URL}/users?username=${userToLogin.username}&password=${userToLogin.password}`,
			)

			if (!checkUserExistsResponse.data[0]) {
				return thunkApi.rejectWithValue('User not found')
			}

			return checkUserExistsResponse.data[0]
		} catch (e) {
			if (axios.isAxiosError(e)) {
				return thunkApi.rejectWithValue(e.message)
			} else {
				return thunkApi.rejectWithValue('An unexpected error occurred')
			}
		}
	},
)
