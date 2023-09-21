import CreateNoteForm from '@/components/create-note-form/CreateNoteForm'
import PrimaryTitle from '@/components/ui/primary-title/PrimaryTitle'
import styles from './page.module.scss'

const page = () => {
	return (
		<div>
			<PrimaryTitle className={styles.title}>
				Creating new note
			</PrimaryTitle>
			<CreateNoteForm />
		</div>
	)
}

export default page
