import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useGetNoteByIdQuery } from '@/store/api/note'
import { NoteCategory } from '@/types/note-category.enum'
import { redirect } from 'next/navigation'
import { FC } from 'react'
import Loader from '../ui/loader/Loader'

type PropsType = {
	noteId: number
}

const Note: FC<PropsType> = ({ noteId }) => {
	const { user } = useTypedSelector(state => state.user)

	if (!user) {
		redirect('/login')
	}

	const { error, isLoading, data: note } = useGetNoteByIdQuery(noteId)

	if (isLoading) {
		return <Loader text='Loading...' />
	}

	if (error) {
		return <h1>Some error occured</h1>
	}

	if (!note) {
		return <h1>Note not found</h1>
	}

	if (note.userId !== user.id) {
		redirect('/')
	}

	// todo: реалізувати відображення нотатки
	// сюди можна додати кнопки: редагування та видалення (замість того, щоб на головній сторінці відображати)

	return <div>Note {NoteCategory[note.category]}</div>
}

export default Note
