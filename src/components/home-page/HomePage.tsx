'use client'

import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useGetNotesByUserIdQuery } from '@/store/api/note'
import { IUserWithId } from '@/types/user.interface'
import { useState } from 'react'
import { PaginationControl } from 'react-bootstrap-pagination-control'
import { FilterSortingModal } from '../filter-sorting-modal/FilterSortingModal'
import NotesList from '../notes-list/NotesList'
import Loader from '../ui/loader/Loader'
import PrimaryButton from '../ui/primary-button/PrimaryButton'
import PrimaryTitle from '../ui/primary-title/PrimaryTitle'
import styles from './HomePage.module.scss'

const HomePage = () => {
	const { user: userFromStore } = useTypedSelector(state => state.user)

	//тут юзер не може бути null, адже дана сторінка обгорнута компонентом RequireAuth, який заздалегідь це перевірить
	const user = userFromStore as IUserWithId

	const { currentPage, limit, selectedCategory, selectedOrderByOption } =
		useTypedSelector(state => state.notes)

	const { setCurrentPage } = useActions()

	const [isModalActive, setIsModalActive] = useState<boolean>(false)

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
		<div className={styles.main}>
			{doNotesExist && (
				<>
					<PrimaryTitle className={styles.title}>
						Your notes
					</PrimaryTitle>

					<FilterSortingModal
						isModalActive={isModalActive}
						setIsModalActive={setIsModalActive}
					/>
					<div className={styles.topBlock}>
						<PrimaryButton
							className={styles.filterSortBtn}
							onClick={() => setIsModalActive(true)}
							type='button'>
							Filtering and sorting
						</PrimaryButton>
						<p>
							Count of notes were found for your request:{' '}
							<span>{notesTotalCount?.length || 0}</span>
						</p>
					</div>
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
	)
}

export default HomePage
