'use client'

import NotesList from '@/components/notes-list/NotesList'
import PrimaryTitle from '@/components/ui/primary-title/PrimaryTitle'
import useNotes from '@/hooks/useNotes'
import { useGetNotesQuery } from '@/store/api/note'
import styles from './page.module.scss'

export default function Home() {
	const { setNotes, loading, error } = useNotes()

	const {
		data: notesFromApi,
		isLoading,
		error: apiError,
	} = useGetNotesQuery(null)

	const deleteNote = (dateOfCreation: Date) => {
		/*const updatedNotes = notes.filter(
			note => note.dateOfCreation !== dateOfCreation,
		)
		setNotes(updatedNotes)*/
	}

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>

	return (
		<main className={styles.main}>
			<PrimaryTitle className={styles.title}>Notes list</PrimaryTitle>
			<NotesList notes={notesFromApi} onDelete={deleteNote} />
		</main>
	)
}
