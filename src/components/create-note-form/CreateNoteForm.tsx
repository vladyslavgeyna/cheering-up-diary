'use client'

import useFormError from '@/hooks/useFormError'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useCreateNoteMutation } from '@/store/api/note'
import { NoteCategory } from '@/types/note-category.enum'
import {
	getEnumAsISelectItemArray,
	getEnumMaxValue,
	getEnumMinValue,
} from '@/utils/enum.utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import FormError from '../form-error/FormError'
import FloatInput from '../ui/float-input/FloatInput'
import Loader from '../ui/loader/Loader'
import PrimaryButton from '../ui/primary-button/PrimaryButton'
import PrimarySelect from '../ui/primary-select/PrimarySelect'
import PrimaryTextarea from '../ui/primary-textarea/PrimaryTextarea'
import styles from './CreateNoteForm.module.scss'

type CreateNoteType = {
	title: string
	text: string
	category: NoteCategory
}

const CreateNoteForm = () => {
	const router = useRouter()

	const { user } = useTypedSelector(state => state.user)

	if (!user) {
		redirect('/login')
	}

	const [createNote, { isLoading, isSuccess }] = useCreateNoteMutation()

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

	const onSubmit: SubmitHandler<CreateNoteType> = async createNoteData => {
		try {
			console.log('createNoteData', createNoteData)
			await createNote({
				title: createNoteData.title,
				text: createNoteData.text,
				category: createNoteData.category,
				userId: user.id,
				dateOfCreation: new Date(),
			})
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (isSuccess) {
			reset()
			router.push('/')
		}
	}, [isSuccess])

	const buttonRef = useRef<HTMLButtonElement>(null)

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
				<PrimaryButton disabled={!isValid && isDirty} type='submit'>
					Create
				</PrimaryButton>
			</form>
		</>
	)
}

export default CreateNoteForm
