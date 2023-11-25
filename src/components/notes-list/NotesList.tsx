'use client'

import styles from '@/components/notes-list/NotesList.module.scss'
import { INote } from '@/types/note.interface'
import NoteItem from '../note-item/NoteItem'

type PropsType = {
	notes: INote[]
	onDelete: (dateOfCreation: Date) => void
}

const NotesList: React.FC<PropsType> = ({ notes, onDelete }) => {
	if (notes.length === 0) {
		return (
			<div className={styles.emptyList}>The list of notes is empty</div>
		)
	}

	return (
		<div className={styles.notesWrapper}>
			{notes.map(note => (
				<NoteItem
					text={note.text}
					title={note.title}
					key={note.dateOfCreation.toString()}
					note={note}
					onDelete={onDelete}
				/>
			))}
		</div>
	)
}

export default NotesList
