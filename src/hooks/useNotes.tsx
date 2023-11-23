import { NoteCategory } from '@/types/note-category.enum'
import { INote } from '@/types/note.interface'
import { UseNotesHook } from '@/types/useNotes.interface'
import { useEffect, useState } from 'react'

function useNotes(): UseNotesHook {
	const [notes, setNotes] = useState<INote[]>([
		// example
		{
			title: 'Зразок нотатки',
			text: 'Це текст зразкової нотатки, щоб перевірити завантаження даних.',
			dateOfCreation: new Date(),
			category: NoteCategory.Thanksgiving,
		},
	])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		try {
			const storedNotes = localStorage.getItem('notes')
			if (storedNotes) {
				const parsedNotes: INote[] = JSON.parse(storedNotes).map(
					(note: INote) => ({
						...note,
						dateOfCreation: new Date(note.dateOfCreation),
					}),
				)
				setNotes(parsedNotes)
			}
			setLoading(false)
		} catch (e) {
			if (e instanceof Error) {
				setError(e)
			}
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes))
	}, [notes])

	return { notes, setNotes, loading, error }
}

export default useNotes
