// src/components/note-summary-list/NoteSummaryList.tsx
import React from 'react'
import NoteItem from '../note-item/NoteItem'
import { INote } from '@/types/note.interface'
import './NoteSummaryList.scss'

interface NoteSummaryListProps {
    notes: INote[];
    onDelete: (dateOfCreation: Date) => void;
}

const NoteSummaryList: React.FC<NoteSummaryListProps> = ({ notes, onDelete }) => {
    return (
        <div className="note-summary-list">
            {notes.map(note => (
                <div key={note.dateOfCreation.toISOString()} className="note-summary-list__item">
                    <h3>{note.title}</h3>
                    <p>
                        {note.text.substring(0, 100)}{note.text.length > 100 && '...'}
                    </p>
                    <button onClick={() => onDelete(note.dateOfCreation)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default NoteSummaryList
