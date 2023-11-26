// src/components/details-modal/DetailsModal.tsx
import Modal from '@/components/modal/Modal'
import { INote } from '@/types/note.interface'
import React from 'react'
import './DetailsModal.scss'

interface DetailsModalProps {
	note: INote
	isActive: boolean
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const DetailsModal: React.FC<DetailsModalProps> = ({
	note,
	isActive,
	setIsActive,
}) => {
	const dateOfCreation = new Date(note.dateOfCreation)

	return (
		<Modal isActive={isActive} setIsActive={setIsActive}>
			<div className='details-modal-content'>
				<h2>{note.title}</h2>
				<p>
					<strong>Type:</strong> {note.category}
				</p>
				<p>
					<strong>Content:</strong> {note.text}
				</p>
				<p>
					<strong>Date of Creation:</strong>{' '}
					{dateOfCreation.toLocaleDateString()} at{' '}
					{dateOfCreation.toLocaleTimeString()}
				</p>
			</div>
		</Modal>
	)
}

export default DetailsModal
