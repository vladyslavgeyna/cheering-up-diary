'use client'

import NotesList from '@/components/notes-list/NotesList'
import ThemeSwitcherButton from '@/components/theme-switcher/ThemeSwitcherButton'
import PrimaryTitle from '@/components/ui/primary-title/PrimaryTitle'
import useNotes from '@/hooks/useNotes'
import styles from './page.module.scss'

export default function Home() {
	const { notes, setNotes, loading, error } = useNotes()

	const deleteNote = (dateOfCreation: Date) => {
		const updatedNotes = notes.filter(
			note => note.dateOfCreation !== dateOfCreation,
		)
		setNotes(updatedNotes)
	}

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>

	return (
		<main className={styles.main}>
			<PrimaryTitle className={styles.title}>Notes list</PrimaryTitle>
			<NotesList notes={notes} onDelete={deleteNote} />
			<ThemeSwitcherButton />
		</main>
	)
}
