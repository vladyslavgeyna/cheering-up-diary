import { INote } from './note.interface'

export interface NoteProps {
	note: INote
	onDelete: (dateOfCreation: Date) => void
}
