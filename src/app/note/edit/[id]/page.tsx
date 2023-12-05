import EditNoteForm from '@/components/edit-note-form/EditNoteForm'
import PrimaryTitle from '@/components/ui/primary-title/PrimaryTitle'
import RequireAuth from '@/components/utils/RequireAuth'
import styles from './page.module.scss'

type PropsType = {
	params: {
		id: string
	}
}

const EditNotePage = ({ params: { id } }: PropsType) => {
	return (
		<RequireAuth>
			<div>
				<PrimaryTitle className={styles.title}>
					Edit Note #{id}
				</PrimaryTitle>
				<EditNoteForm noteId={Number(id)} />
			</div>
		</RequireAuth>
	)
}

export default EditNotePage
