import { INote } from './note.interface'

export interface UseNotesHook {
	notes: INote[]
	setNotes: React.Dispatch<React.SetStateAction<INote[]>>
	loading: boolean
	error: Error | null
}
