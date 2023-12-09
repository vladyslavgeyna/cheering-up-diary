'use client'

import styles from '@/components/notes-list/NotesList.module.scss'
import { INoteWithId } from '@/types/note.interface'
import Link from 'next/link'
import NoteItem from '../note-item/NoteItem'

type PropsType = {
	notes: INoteWithId[] | undefined
}

const NotesList: React.FC<PropsType> = ({ notes }) => {
	if (notes == undefined) return

	if (notes.length === 0) {
		return (
			<div className={styles.emptyList}>
				<div>
					At the moment there are no notes or they were not found
				</div>
				<div>
					But you can <Link href={'/note/create'}>create one</Link>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.notesWrapper}>
			{notes.map(note => (
				<NoteItem
					text={note.text}
					title={note.title}
					key={note.id}
					note={note}
				/>
			))}
		</div>
	)
}

export default NotesList
