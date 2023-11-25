import { INote, INoteWithId } from '@/types/note.interface'
import { api } from './api'

export const noteApi = api.injectEndpoints({
	endpoints: builder => ({
		getNotes: builder.query<INoteWithId[], null>({
			query: () => '/notes',
			providesTags: () => [
				{
					type: 'Note',
				},
			],
		}),
		getNoteById: builder.query<INoteWithId, number>({
			query: noteId => `/notes/${noteId}`,
			providesTags: (_result, _error, noteId) => [
				{
					type: 'Note',
					id: noteId,
				},
			],
		}),
		createRecipe: builder.mutation<null, INote>({
			query: note => ({
				body: note,
				url: '/notes',
				method: 'POST',
			}),
			invalidatesTags: () => [
				{
					type: 'Note',
				},
			],
		}),
	}),
})

export const { useGetNoteByIdQuery, useGetNotesQuery } = noteApi
