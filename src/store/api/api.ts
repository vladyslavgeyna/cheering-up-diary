import { INote } from '@/types/note.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../../config'

export interface INoteWithId extends INote {
	id: number
}

export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['Note'],
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
	}),
	endpoints: builder => ({
		getNotes: builder.query<INoteWithId[], null>({
			query: () => '/notes',
		}),
	}),
})

export const { useGetNotesQuery } = api
