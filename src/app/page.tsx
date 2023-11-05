'use client'

import NotesList from '@/components/notes-list/NotesList'
import PrimaryTitle from '@/components/ui/primary-title/PrimaryTitle'
import useNotes from '@/hooks/useNotes'
import styles from './page.module.scss'
export default function Home() {
	/*const [notes, setNotes] = useState<INote[]>([])

	useEffect(() => {
		// this part will be refactored in lab3
		const storedNotes = localStorage.getItem('notes')
		if (storedNotes) {
			const parsedNotes: INote[] = JSON.parse(storedNotes)

			const convertedNotes = parsedNotes.map(note => ({
				...note,
				dateOfCreation: new Date(note.dateOfCreation),
			}))
			setNotes(convertedNotes)
		} else {
			const initialNotes: INote[] = [
				{
					title: 'First note',
					text: 'deserunt mollit anim id est laborum....',
					dateOfCreation: new Date(),
					category: NoteCategory.Thanksgiving,
				},
			]
			setNotes(initialNotes)
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('notes', JSON.stringify(notes))
	}, [notes])
*/
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
		</main>
	)
}
