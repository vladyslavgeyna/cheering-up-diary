'use client'

import styles from '@/components/note-item/NoteItem.module.scss'
import { NoteCategory } from '@/types/note-category.enum'
import { NoteProps } from '@/types/note-props.interface'
import Button from './subcomponents/NoteButton'

const NoteItem: React.FC<NoteProps> = ({ note, onDelete }) => {
	if (!note) {
		return null
	}

	const handleDetailsClick = () => {
		// Логіка для перегляду деталей нотатки
		console.log('Перегляд деталей нотатки:', note.title)
	}

	const handleEditClick = () => {
		// Логіка для редагування нотатки
		console.log('Редагування нотатки:', note.title)
	}

	const handleDeleteClick = () => {
		onDelete(note.dateOfCreation)
	}

	return (
		<div className={styles.noteCard}>
			<div className={styles.noteHeader}>
				<div>
					<h2 className={styles.noteTitle}>{note.title}</h2>
					<span className={styles.noteCategory}>
						{NoteCategory[note.category]}
					</span>
				</div>
				<span className={styles.noteTime}>
					{note.dateOfCreation.toLocaleDateString()} at{' '}
					{note.dateOfCreation.toLocaleTimeString()}
				</span>
			</div>
			<p className={styles.noteContent}>{note.text}</p>
			<div className={styles.noteActions}>
				<Button color='blue' onClick={handleDetailsClick}>
					Details
				</Button>
				<Button color='green' onClick={handleEditClick}>
					Edit
				</Button>
				<Button color='red' onClick={handleDeleteClick}>
					Delete
				</Button>
			</div>
		</div>
	)
}

export default NoteItem
