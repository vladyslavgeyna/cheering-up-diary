'use client'

import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useDeleteNoteMutation, useGetNoteByIdQuery } from '@/store/api/note'
import { redirect, useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import Loader from '../ui/loader/Loader'
import PrimaryButton from '../ui/primary-button/PrimaryButton'
import PrimaryLink from '../ui/primary-link/PrimaryLink'
import styles from './Note.module.scss'

type PropsType = {
	noteId: number
}

const Note: FC<PropsType> = ({ noteId }) => {
	const router = useRouter()

	const [isDeletingNoteStarted, setIsDeletingNoteStarted] = useState(false)

	const { user } = useTypedSelector(state => state.user)

	if (!user) {
		redirect('/login')
	}

	const [deleteNote, { isLoading: isDeleteLoading }] = useDeleteNoteMutation()

	const {
		error,
		isLoading,
		data: note,
	} = useGetNoteByIdQuery(noteId, {
		skip: isDeleteLoading,
	})

	if (isLoading || isDeleteLoading) {
		return <Loader text='Loading...' />
	}

	if (!note || note.userId !== user.id) {
		return (
			!isDeletingNoteStarted && (
				<h1>The note with id {noteId} was not found</h1>
			)
		)
	}

	if (error) {
		if ('status' in error && error.status === 404) {
			return (
				!isDeletingNoteStarted && (
					<h1>The note with id {noteId} was not found</h1>
				)
			)
		}

		return <h1>Some error occurred</h1>
	}

	const handleDelete = async (noteId: number) => {
		try {
			setIsDeletingNoteStarted(true)
			await deleteNote(noteId)
			router.push('/')
		} catch (error) {
			console.log(error)
		}
	}

	const dateOfCreation = new Date(note.dateOfCreation)

	return (
		<div>
			<div className={styles.title}>
				<p>Your note:</p>
				<h1>
					#{note.id} {note.title}
				</h1>
			</div>
			<div className={styles.createdAt}>
				<p>
					You created this note:{' '}
					<span>
						{dateOfCreation.toLocaleDateString()} at{' '}
						{dateOfCreation.toLocaleTimeString()}
					</span>
				</p>
			</div>
			<div className={styles.text}>
				<p>
					Here are some mentions of the event described in this note:
				</p>
				<p>{note.text}</p>
			</div>
			<div className={styles.btns}>
				<PrimaryButton
					onClick={() => handleDelete(note.id)}
					type='button'>
					Delete this note
				</PrimaryButton>
				<PrimaryLink href={`/note/edit/${note.id}`}>
					Edit this note
				</PrimaryLink>
			</div>
		</div>
	)
}

export default Note
