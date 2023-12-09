import { NoteCategory } from './note-category.enum'
import { NoteColor } from './note-color.enum'

export interface INote {
	title: string
	text: string
	dateOfCreation: Date
	category: NoteCategory
	color: NoteColor
	userId: number
}

export interface INoteWithId extends INote {
	id: number
}
