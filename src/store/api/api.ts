import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../../config'

export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['Note'],
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
	}),
	endpoints: builder => ({}),
})
