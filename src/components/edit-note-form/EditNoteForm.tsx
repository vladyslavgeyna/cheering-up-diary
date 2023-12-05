'use client'

import useFormError from '@/hooks/useFormError'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useGetNoteByIdQuery, useUpdateNoteMutation } from '@/store/api/note'
import { NoteCategory } from '@/types/note-category.enum'
import {
	getEnumAsISelectItemArray,
	getEnumMaxValue,
	getEnumMinValue,
} from '@/utils/enum.utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { redirect, useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import FormError from '../form-error/FormError'
import FloatInput from '../ui/float-input/FloatInput'
import Loader from '../ui/loader/Loader'
import PrimaryButton from '../ui/primary-button/PrimaryButton'
import PrimarySelect from '../ui/primary-select/PrimarySelect'
import PrimaryTextarea from '../ui/primary-textarea/PrimaryTextarea'
import styles from './EditNoteForm.module.scss'

type EditNoteType = {
	title: string
	text: string
	category: NoteCategory
}

type PropsType = {
	noteId: number
}

const EditNoteForm: FC<PropsType> = ({ noteId }) => {
	const router = useRouter()

	const { user } = useTypedSelector(state => state.user)

	if (!user) {
		redirect('/login')
	}

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
			.required('Category is required')
			.min(getEnumMinValue(NoteCategory), 'Invalid category')
			.max(getEnumMaxValue(NoteCategory), 'Invalid category'),
	})

	const { getErrorComponent } = useFormError()

	const { error, isLoading, data: note } = useGetNoteByIdQuery(noteId)

	const [editNote, { isLoading: isUpdateNoteLoading, isSuccess }] =
		useUpdateNoteMutation()

	const {
		handleSubmit,
		register,
		formState: { errors, isValid, isDirty },
		reset,
	} = useForm<EditNoteType>({
		mode: 'onChange',
		defaultValues: {
			text: note?.text,
			title: note?.title,
			category: note?.category,
		},
		resolver: yupResolver(schema),
	})

	useEffect(() => {
		if (isSuccess) {
			reset()
			router.push('/')
		}
	}, [isSuccess])

	if (isLoading || isUpdateNoteLoading) {
		return <Loader text='Loading...' />
	}

	if (!note || note.userId !== user.id) {
		return <h1>The note with id {noteId} was not found</h1>
	}

	if (error) {
		if ('status' in error && error.status === 404) {
			return <h1>The note with id {noteId} was not found</h1>
		}

		return <h1>Some error occurred</h1>
	}

	const onSubmit: SubmitHandler<EditNoteType> = async editNoteData => {
		try {
			await editNote({
				id: note.id,
				title: editNoteData.title,
				text: editNoteData.text,
				category: editNoteData.category,
				userId: user.id,
				dateOfCreation: note.dateOfCreation,
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
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
				<PrimaryButton disabled={!isValid && isDirty} type='submit'>
					Save
				</PrimaryButton>
			</form>
		</>
	)
}

export default EditNoteForm
