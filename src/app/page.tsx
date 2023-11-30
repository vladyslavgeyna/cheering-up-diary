'use client'

import NotesList from '@/components/notes-list/NotesList'
import Loader from '@/components/ui/loader/Loader'
import PrimaryTitle from '@/components/ui/primary-title/PrimaryTitle'
import RequireAuth from '@/components/utils/RequireAuth'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useGetNotesByUserIdQuery } from '@/store/api/note'
import { redirect } from 'next/navigation'
import { PaginationControl } from 'react-bootstrap-pagination-control'
import styles from './page.module.scss'

export default function Home() {
	const { user } = useTypedSelector(state => state.user)

	const { currentPage, limit } = useTypedSelector(state => state.notes)

	const { setCurrentPage } = useActions()

	if (!user) {
		redirect('/login')
	}

	const { error, isLoading, data } = useGetNotesByUserIdQuery({
		userId: user.id,
		limit,
		page: currentPage,
	})

	const { isLoading: isNotesTotalCountLoading, data: notesTotalCount } =
		useGetNotesByUserIdQuery({
			userId: user.id,
		})

	const deleteNote = (dateOfCreation: Date) => {
		console.log('Delete note')
	}

	if (isLoading || isNotesTotalCountLoading) {
		return <Loader text='Loading...' />
	}

	if (error) {
		return <h1>Some error occured</h1>
	}

	const doNotesExist = data && data.length > 0

	return (
		<RequireAuth>
			<div className={styles.main}>
				{doNotesExist && (
					<PrimaryTitle className={styles.title}>
						Your notes
					</PrimaryTitle>
				)}
				<NotesList notes={data} onDelete={deleteNote} />
				{doNotesExist && (
					<div className={styles.paginationWrapper}>
						<PaginationControl
							page={currentPage}
							limit={limit}
							total={notesTotalCount?.length || 0}
							last={true}
							next={true}
							changePage={page => {
								setCurrentPage(page)
							}}
						/>
					</div>
				)}
			</div>
		</RequireAuth>
	)
}
