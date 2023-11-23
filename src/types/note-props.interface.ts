import { INote } from './note.interface'

export interface NoteProps {
    title(title: any): [any, any]
    text(text: any): [any, any]
	note: INote
	onDelete: (dateOfCreation: Date) => void
}
