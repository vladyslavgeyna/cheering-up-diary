'use client'
import { useState } from 'react'
import FloatInput from '../ui/float-input/FloatInput'
import PrimaryButton from '../ui/primary-button/PrimaryButton'
import PrimarySelect from '../ui/primary-select/PrimarySelect'
import PrimaryTextarea from '../ui/primary-textarea/PrimaryTextarea'
import styles from './CreateNoteForm.module.scss'

export enum NoteCategory {
	'Thanksgiving' = 1,
	'Positive moment',
}

const CreateNoteForm = () => {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [category, setCategory] = useState('')

	const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		console.log('title', title)
		console.log('text', text)
		console.log('category', category)
	}

	return (
		<form
			onSubmit={e => onFormSubmit(e)}
			className={styles.form}
			method='post'>
			<div className={styles.formItem}>
				<FloatInput
					value={title}
					onChange={e => setTitle(e.target.value)}
					label='Title'
				/>
			</div>
			<div className={styles.formItem}>
				<p className={styles.formLabel}>Text</p>
				<PrimaryTextarea
					value={text}
					onChange={e => setText(e.target.value)}
				/>
			</div>
			<div className={styles.formItem}>
				<PrimarySelect
					value={category}
					onChange={e => setCategory(e.target.value)}>
					<option selected disabled value=''>
						Choose type of note
					</option>
					<option value={NoteCategory.Thanksgiving}>
						{NoteCategory[NoteCategory.Thanksgiving]}
					</option>
					<option value={NoteCategory['Positive moment']}>
						{NoteCategory[NoteCategory['Positive moment']]}
					</option>
				</PrimarySelect>
			</div>
			<PrimaryButton type='submit'>Create</PrimaryButton>
		</form>
	)
}

export default CreateNoteForm
