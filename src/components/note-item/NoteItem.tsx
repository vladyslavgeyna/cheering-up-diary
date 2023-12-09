'use client'

import styles from '@/components/note-item/NoteItem.module.scss'
import { NoteCategory } from '@/types/note-category.enum'
import { NoteColor } from '@/types/note-color.enum'
import { INoteWithId } from '@/types/note.interface'
import { CSSProperties } from 'react'
import PrimaryLink from '../ui/primary-link/PrimaryLink'

type PropsType = {
	title: string
	text: string
	note: INoteWithId
}

const NoteItem: React.FC<PropsType> = ({ note }) => {
	if (!note) {
		return null
	}

	const dateOfCreation = new Date(note.dateOfCreation)

	const backgroundColorStyle: string =
		note.color === 1 ? 'transparent' : NoteColor[note.color]

	const styleObject: CSSProperties = { backgroundColor: backgroundColorStyle }

	if (
		backgroundColorStyle === NoteColor[NoteColor.White] ||
		backgroundColorStyle === NoteColor[NoteColor.Yellow]
	) {
		styleObject.color = 'black'
	} else if (
		backgroundColorStyle === NoteColor[NoteColor.Black] ||
		backgroundColorStyle === NoteColor[NoteColor.Blue]
	) {
		styleObject.color = 'white'
	}

	return (
		<div style={styleObject} className={styles.noteCard}>
			<div className={styles.noteHeader}>
				<div>
					<h2 className={styles.noteTitle}>{note.title}</h2>
					<span className={styles.noteCategory}>
						{NoteCategory[note.category]}
					</span>
				</div>
				<div className={styles.noteTime}>
					{dateOfCreation.toLocaleDateString()} at{' '}
					{dateOfCreation.toLocaleTimeString()}
				</div>
			</div>
			<p className={styles.noteContent}>{note.text}</p>
			<div className={styles.noteActions}>
				<PrimaryLink
					className={styles.details}
					href={`/note/${note.id}`}>
					Details
				</PrimaryLink>
			</div>
		</div>
	)
}

export default NoteItem
