'use client'

import styles from '@/components/notes-list/NotesList.module.scss'
import { NotesListProps } from '@/types/note-list-props.interface'
import NoteItem from '../note-item/NoteItem'

const NotesList: React.FC<NotesListProps> = ({ notes, onDelete }) => {
	return (
		<div className={styles.notesWrapper}>
			{notes.map(note => (
				<NoteItem
					key={note.dateOfCreation.toString()}
					note={note}
					onDelete={onDelete}
				/>
			))}
		</div>
	)
}

export default NotesList
