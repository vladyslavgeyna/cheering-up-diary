'use client'

import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { NoteCategory } from '@/types/note-category.enum'
import { getEnumAsISelectItemArray } from '@/utils/enum.utils'
import { useRouter } from 'next/navigation'
import React, { FC, useState } from 'react'
import Modal from '../modal/Modal'
import PrimaryButton from '../ui/primary-button/PrimaryButton'
import PrimarySelect from '../ui/primary-select/PrimarySelect'
import styles from './FilterSortingModal.module.scss'

type PropsType = {
	isModalActive: boolean
	setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

export enum CarAdsOrderByOptions {
	'Date of creation, ascending' = 1,
	'Date of creation, descending',
}

export const FilterSortingModal: FC<PropsType> = ({
	isModalActive,
	setIsModalActive,
}) => {
	const router = useRouter()

	const { setCurrentPage } = useActions()

	const { setSelectedCategory, setSelectedOrderByOption } = useActions()

	const { selectedCategory, selectedOrderByOption } = useTypedSelector(
		state => state.notes,
	)

	//Додав локальний стейт поверх глобального, щоб спочатку змінювати локальний (при заповненні форми), а лише після відправки форми локальний стейт передавати до глобального
	//Інакше зміни фільтрації і сортування будуть застосовані одразу навіть без натиснення на кнопку 'Apply'
	const [selectedCategoryLocally, setSelectedCategoryLocally] = useState(
		'' || selectedCategory,
	)
	const [selectedOrderByOptionsLocally, setSelectedOrderByOptionsLocally] =
		useState('' || selectedOrderByOption)

	const [] = useState('')

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			setSelectedCategory(selectedCategoryLocally)
			setSelectedOrderByOption(selectedOrderByOptionsLocally)
			setIsModalActive(false)
		} catch (error) {
			console.log(error)
		}
	}

	const handleReset = () => {
		setSelectedCategoryLocally('')
		setSelectedOrderByOptionsLocally('')
		setSelectedCategory('')
		setSelectedOrderByOption('')
		setCurrentPage(1)
		setIsModalActive(false)
		router.push('/')
	}

	return (
		<Modal isActive={isModalActive} setIsActive={setIsModalActive}>
			<form
				method='post'
				onSubmit={e => onSubmit(e)}
				className={styles.modalWrapper}>
				<div className={styles.modalHeader}>Filtration and sorting</div>
				<div className={styles.modalBody}>
					<div className={styles.complexFormItem}>
						Order&nbsp;by:&nbsp;
						<PrimarySelect
							items={getEnumAsISelectItemArray(
								CarAdsOrderByOptions,
							)}
							value={selectedOrderByOptionsLocally}
							defaultValue='By default'
							isDefaultOptionDisabled={false}
							onChange={setSelectedOrderByOptionsLocally}
						/>
					</div>
					<div>
						<PrimarySelect
							items={getEnumAsISelectItemArray(NoteCategory)}
							defaultValue='Choose note category'
							value={selectedCategoryLocally}
							onChange={setSelectedCategoryLocally}
						/>
					</div>
				</div>
				<div className={styles.modalFooter}>
					<PrimaryButton
						className={styles.footerBtn}
						type='button'
						onClick={() => setIsModalActive(false)}>
						Cancel
					</PrimaryButton>
					<PrimaryButton
						className={styles.footerBtn}
						onClick={handleReset}
						type='button'>
						Reset
					</PrimaryButton>
					<PrimaryButton className={styles.footerBtn} type='submit'>
						Apply
					</PrimaryButton>
				</div>
			</form>
		</Modal>
	)
}
