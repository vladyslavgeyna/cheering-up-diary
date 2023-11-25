import { NoteCategory } from './note-category.enum'

export interface INote {
	title: string
	text: string
	dateOfCreation: Date
	category: NoteCategory
}

export interface INoteWithId extends INote {
	id: number
}
