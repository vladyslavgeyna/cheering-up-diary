'use client'

import { NoteCategory } from '@/types/note-category.enum'
import { INote } from '@/types/note.interface'
import {
	getEnumAsISelectItemArray,
	getEnumMaxValue,
	getEnumMinValue,
} from '@/utils/enum.utils'
import { useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormError from '../form-error/FormError'
import FloatInput from '../ui/float-input/FloatInput'
import PrimaryButton from '../ui/primary-button/PrimaryButton'
import PrimarySelect from '../ui/primary-select/PrimarySelect'
import PrimaryTextarea from '../ui/primary-textarea/PrimaryTextarea'
import styles from './CreateNoteForm.module.scss'

type CreateNoteType = Omit<INote, 'dateOfCreation'>

const CreateNoteForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors, isValid, isDirty },
		reset,
	} = useForm<CreateNoteType>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<CreateNoteType> = createNoteData => {
		try {
			console.log(createNoteData)
			reset()
		} catch (error) {
			console.log(error)
		}
	}

	const buttonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		console.log('here')

		if (buttonRef.current) {
			buttonRef.current.disabled = !isValid && isDirty
		}
	}, [isValid, isDirty])

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={styles.form}
			method='post'>
			<div className={styles.formItem}>
				<FloatInput
					register={register('title', {
						required: 'Title is required',
						maxLength: {
							value: 20,
							message: 'Max title length is 20',
						},
						minLength: {
							value: 3,
							message: 'Min title length is 3',
						},
					})}
					type='text'
					label='Title'
				/>
				<FormError
					className={styles.formError}
					message={errors.title?.message}
				/>
			</div>
			<div className={styles.formItem}>
				<p className={styles.formLabel}>Text</p>
				<PrimaryTextarea
					register={register('text', {
						required: 'Text is required',
						maxLength: {
							value: 500,
							message: 'Max text length is 500',
						},
						minLength: {
							value: 10,
							message: 'Min text length is 10',
						},
					})}
				/>
				<FormError
					className={styles.formError}
					message={errors.text?.message}
				/>
			</div>
			<div className={styles.formItem}>
				<PrimarySelect
					items={getEnumAsISelectItemArray(NoteCategory)}
					register={register('category', {
						required: 'Category is required',
						max: {
							value: getEnumMaxValue(NoteCategory),
							message: 'Incorrect category',
						},
						min: {
							value: getEnumMinValue(NoteCategory),
							message: 'Incorrect category',
						},
					})}
					defaultValue='Choose type of note'
				/>
				<FormError
					className={styles.formError}
					message={errors.category?.message}
				/>
			</div>
			<PrimaryButton buttonRef={buttonRef} type='submit'>
				Create
			</PrimaryButton>
		</form>
	)
}

export default CreateNoteForm
