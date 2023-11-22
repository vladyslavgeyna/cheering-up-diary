'use client'

import useFormError from '@/hooks/useFormError'
import { NoteCategory } from '@/types/note-category.enum'
import { INote } from '@/types/note.interface'
import {
	getEnumAsISelectItemArray,
	getEnumMaxValue,
	getEnumMinValue,
} from '@/utils/enum.utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useRef, useState } from 'react'
import { getLocalStorageItemAsync } from '@/utils/utils'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import FormError from '../form-error/FormError'
import FloatInput from '../ui/float-input/FloatInput'
import Loader from '../ui/loader/Loader'
import PrimaryButton from '../ui/primary-button/PrimaryButton'
import PrimarySelect from '../ui/primary-select/PrimarySelect'
import PrimaryTextarea from '../ui/primary-textarea/PrimaryTextarea'
import styles from './CreateNoteForm.module.scss'

type CreateNoteType = Omit<INote, 'dateOfCreation'>

const CreateNoteForm = () => {
	const schema = yup.object({
		title: yup
			.string()
			.required('Title is required')
			.min(3, 'Min title length is 3')
			.max(20, 'Max title length is 20'),
		text: yup
			.string()
			.required('Text is required')
			.min(10, 'Min text length is 10')
			.max(500, 'Max text length is 500'),
		category: yup
			.number()
			.integer()
			.required('Category is required')
			.min(getEnumMinValue(NoteCategory), 'Incorrect category')
			.max(getEnumMaxValue(NoteCategory), 'Incorrect category'),
	})

	const {
		handleSubmit,
		register,
		formState: { errors, isValid, isDirty },
		reset,
	} = useForm<CreateNoteType>({
		mode: 'onChange',
		resolver: yupResolver(schema),
	})

	const { getErrorComponent, setError, setErrorMessage } = useFormError()

	const [isLoading, setIsLoading] = useState(false)

	const onSubmit: SubmitHandler<CreateNoteType> = async createNoteData => {
		try {
			setIsLoading(true)

			const notes = await getLocalStorageItemAsync('notes')

			setIsLoading(false)

			if (notes) {
				const notesArray = JSON.parse(notes) as INote[]
				if (
					notesArray.some(note => note.title === createNoteData.title)
				) {
					setError(true)
					setErrorMessage(
						`Note with the title '${createNoteData.title}' already exists`,
					)
					return
				}
			}

			console.log(createNoteData)
			reset()
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	const buttonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		if (buttonRef.current) {
			buttonRef.current.disabled = !isValid && isDirty
		}
	}, [isValid, isDirty])

	return (

		<>
			{isLoading && <Loader text='Loading...' />}
			<div className={styles.generalFormError}>{getErrorComponent()}</div>
			<form
			onSubmit={handleSubmit(onSubmit)}
			className={styles.form}
			method='post'>
			<div className={styles.formItem}>
				<FloatInput
					register={register('title')}
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
				<PrimaryTextarea register={register('text')} />
				<FormError
					className={styles.formError}
					message={errors.text?.message}
				/>
			</div>
			<div className={styles.formItem}>
				<PrimarySelect
					items={getEnumAsISelectItemArray(NoteCategory)}
					register={register('category')}
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
		</>
	)
}

export default CreateNoteForm
