'use client'

import NotesList from '@/components/notes-list/NotesList'
import Loader from '@/components/ui/loader/Loader'
import PrimaryTitle from '@/components/ui/primary-title/PrimaryTitle'
import RequireAuth from '@/components/utils/RequireAuth'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useGetNotesByUserIdQuery } from '@/store/api/note'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'

export default function Home() {
	const { user } = useTypedSelector(state => state.user)

	if (!user) {
		redirect('/login')
	}

	const { error, isLoading, data } = useGetNotesByUserIdQuery(user.id)

	const deleteNote = (dateOfCreation: Date) => {
		console.log('Delete note')
	}

	if (isLoading) {
		return <Loader text='Loading...' />
	}

	if (error) {
		return <h1>Some error occured</h1>
	}

	return (
		<RequireAuth>
			<div className={styles.main}>
				{data && data.length > 0 && (
					<PrimaryTitle className={styles.title}>
						Notes list
					</PrimaryTitle>
				)}
				<NotesList notes={data} onDelete={deleteNote} />
			</div>
		</RequireAuth>
	)
}
