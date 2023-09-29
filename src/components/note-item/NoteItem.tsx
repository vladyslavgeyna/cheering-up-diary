'use client'

import styles from '@/components/start-page-note/StartPageNote.module.scss'
import PrimaryButton from '@/components/ui/primary-button/PrimaryButton'
import { NoteCategory } from '@/types/note-category.enum'
import { NoteProps } from '@/types/note-props.interface'

const NoteItem: React.FC<NoteProps> = ({ note, onDelete }) => {
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
				<h2 className={styles.noteTitle}>{note.title}</h2>
				<span className={styles.noteCategory}>
					{NoteCategory[note.category]}
				</span>
				<span className={styles.noteTime}>
					{note.dateOfCreation.toLocaleTimeString()},{' '}
					{note.dateOfCreation.toLocaleDateString()}
				</span>
			</div>
			<p className={styles.noteContent}>{note.text}</p>
			<div className={styles.noteActions}>
				<PrimaryButton type='button' className={styles.detailsButton}>
					Деталі
				</PrimaryButton>
				<PrimaryButton type='button' className={styles.editButton}>
					Редагувати
				</PrimaryButton>
				<PrimaryButton type='button' className={styles.deleteButton}>
					Видалити
				</PrimaryButton>
			</div>
		</div>
	)
}

export default NoteItem
