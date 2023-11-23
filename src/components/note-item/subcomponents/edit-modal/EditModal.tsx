// src/components/edit-modal/EditModal.tsx
import React, { useState } from 'react'
import Modal from '@/components/modal/Modal'
import { INote } from '@/types/note.interface'
import './EditModal'

interface EditModalProps {
    note: INote;
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    onSave: (updatedNote: INote) => void;
}

interface NoteProps {
    id: string;
    title: string;
    text: string;
    createdAt: Date;
}

const EditModal: React.FC<EditModalProps> = ({ note, isActive, setIsActive, onSave }) => {
    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)

    const handleSave = () => {
        onSave({ ...note, title, text })
        setIsActive(false)
    }

    return (
        <Modal isActive={isActive} setIsActive={setIsActive}>
            <div className="edit-modal-content">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea value={text} onChange={(e) => setText(e.target.value)} />
                <button onClick={handleSave}>Save</button>
            </div>
        </Modal>
    )
}

export default EditModal
