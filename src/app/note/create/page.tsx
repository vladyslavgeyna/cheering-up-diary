import CreateNoteForm from '@/components/create-note-form/CreateNoteForm'
import PrimaryTitle from '@/components/ui/primary-title/PrimaryTitle'
import RequireAuth from '@/components/utils/RequireAuth'
import styles from './page.module.scss'

const page = () => {
	return (
		<RequireAuth>
			<div>
				<PrimaryTitle className={styles.title}>
					Creating new note
				</PrimaryTitle>
				<CreateNoteForm />
			</div>
		</RequireAuth>
	)
}

export default page
