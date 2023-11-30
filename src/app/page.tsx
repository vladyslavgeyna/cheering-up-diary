'use client'

import { FilterSortingModal } from '@/components/filter-sorting-modal/FilterSortingModal'
import NotesList from '@/components/notes-list/NotesList'
import Loader from '@/components/ui/loader/Loader'
import PrimaryButton from '@/components/ui/primary-button/PrimaryButton'
import PrimaryTitle from '@/components/ui/primary-title/PrimaryTitle'
import RequireAuth from '@/components/utils/RequireAuth'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useGetNotesByUserIdQuery } from '@/store/api/note'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { PaginationControl } from 'react-bootstrap-pagination-control'
import styles from './page.module.scss'

export default function Home() {
	const { user } = useTypedSelector(state => state.user)

	const { currentPage, limit, selectedCategory, selectedOrderByOption } =
		useTypedSelector(state => state.notes)

	const { setCurrentPage } = useActions()

	const [isModalActive, setIsModalActive] = useState<boolean>(false)

	if (!user) {
		redirect('/login')
	}

	const { error, isLoading, data } = useGetNotesByUserIdQuery({
		userId: user.id,
		limit,
		page: currentPage,
		category: selectedCategory,
		orderByOption: selectedOrderByOption,
	})

	const { isLoading: isNotesTotalCountLoading, data: notesTotalCount } =
		useGetNotesByUserIdQuery({
			userId: user.id,
			category: selectedCategory,
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
					<>
						<PrimaryTitle className={styles.title}>
							Your notes
						</PrimaryTitle>
						<PrimaryButton
							className={styles.filterSortBtn}
							onClick={() => setIsModalActive(true)}
							type='button'>
							Filtering and sorting
						</PrimaryButton>
						<FilterSortingModal
							isModalActive={isModalActive}
							setIsModalActive={setIsModalActive}
						/>
					</>
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
