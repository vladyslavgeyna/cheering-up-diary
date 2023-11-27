'use client'

import styles from '@/components/note-item/NoteItem.module.scss'
import { NoteCategory } from '@/types/note-category.enum'
import { INote, INoteWithId } from '@/types/note.interface'
import { useState } from 'react'
import DetailsModal from './subcomponents/details-modal/DetailsModal'
import EditModal from './subcomponents/edit-modal/EditModal'
import Button from './subcomponents/note-button/NoteButton'

type PropsType = {
	title: string
	text: string
	note: INoteWithId
	onDelete: (dateOfCreation: Date) => void
}

const NoteItem: React.FC<PropsType> = ({ note, onDelete }) => {
	const [isDetailsActive, setIsDetailsActive] = useState(false)
	const [isEditActive, setIsEditActive] = useState(false)

	if (!note) {
		return null
	}

	const handleDetailsClick = () => {
		setIsDetailsActive(true)
	}

	const handleEditClick = () => {
		setIsEditActive(true)
	}

	const handleSave = (updatedNote: INote) => {
		// Змініть на правильний тип
		// Тут можна додати логіку для збереження оновленої нотатки
	}

	const handleDeleteClick = () => {
		onDelete(note.dateOfCreation)
	}

	const dateOfCreation = new Date(note.dateOfCreation)

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
					{dateOfCreation.toLocaleDateString()} at{' '}
					{dateOfCreation.toLocaleTimeString()}
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
			<DetailsModal
				note={note}
				isActive={isDetailsActive}
				setIsActive={setIsDetailsActive}
			/>
			<EditModal
				note={note}
				isActive={isEditActive}
				setIsActive={setIsEditActive}
				onSave={handleSave}
			/>
		</div>
	)
}

export default NoteItem
