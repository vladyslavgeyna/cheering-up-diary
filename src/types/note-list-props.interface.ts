import { INote } from '@/types/note.interface'

export interface NotesListProps {
	notes: INote[]
	onDelete: (dateOfCreation: Date) => void
}
