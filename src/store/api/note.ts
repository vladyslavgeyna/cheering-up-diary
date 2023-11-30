import { INote, INoteWithId } from '@/types/note.interface'
import { api } from './api'

interface IGetNoteByUserIdQueryParams {
	userId: number
	page?: number
	limit?: number
	category?: string
	orderByOption?: string
}

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
		getNotesByUserId: builder.query<
			INoteWithId[],
			IGetNoteByUserIdQueryParams
		>({
			query: params => {
				let url = `/notes?userId=${params.userId}&_limit=${
					params.limit || ''
				}&_page=${params.page || ''}`

				if (params.category) {
					url += `&category=${params.category}`
				}

				if (params.orderByOption) {
					if (params.orderByOption === '1') {
						url += '&_sort=dateOfCreation&_order=asc'
					} else if (params.orderByOption === '2') {
						url += '&_sort=dateOfCreation&_order=desc'
					}
				}

				return {
					url,
				}
			},
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
		createNote: builder.mutation<null, INote>({
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

		deleteNote: builder.mutation<null, number>({
			query: noteId => ({
				url: `/notes/${noteId}`,
				method: 'DELETE',
			}),
			invalidatesTags: (_result, _error, noteId) => [
				{
					type: 'Note',
					id: noteId,
				},
			],
		}),
		updateNote: builder.mutation<null, INoteWithId>({
			query: note => ({
				url: `/notes/${note.id}`,
				method: 'PUT',
				body: note,
			}),
			invalidatesTags: (_result, _error, note) => [
				{
					type: 'Note',
					id: note.id,
				},
			],
		}),
	}),
})

export const {
	useGetNoteByIdQuery,
	useGetNotesQuery,
	useGetNotesByUserIdQuery,
	useCreateNoteMutation,
	useDeleteNoteMutation,
	useUpdateNoteMutation,
} = noteApi
