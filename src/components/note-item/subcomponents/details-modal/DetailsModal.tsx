// src/components/details-modal/DetailsModal.tsx
import React from 'react'
import Modal from '@/components/modal/Modal'
import { INote } from '@/types/note.interface'
import './DetailsModal.scss'
import { NoteCategory } from '@/types/note-category.enum'

interface DetailsModalProps {
    note: INote;
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}


const DetailsModal: React.FC<DetailsModalProps> = ({ note, isActive, setIsActive }) => {
    return (
        <Modal isActive={isActive} setIsActive={setIsActive}>
            <div className="details-modal-content">
                <h2>{note.title}</h2>
                <p><strong>Type:</strong> {NoteCategory[note.category]}</p>
                <p><strong>Content:</strong> {note.text}</p>
                <p><strong>Date of Creation:</strong> {note.dateOfCreation.toLocaleDateString()} at {note.dateOfCreation.toLocaleTimeString()}</p>
            </div>
        </Modal>
    )
}


export default DetailsModal
