import { NoteCategory } from './note-category.enum'

export interface INote {
	title: string
	text: string
	dateOfCreation: Date
	category: NoteCategory
	userId: number
}

export interface INoteWithId extends INote {
	id: number
}
