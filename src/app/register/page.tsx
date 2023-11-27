import RegistrationForm from '@/components/registration-form/RegistrationForm'
import PrimaryTitle from '@/components/ui/primary-title/PrimaryTitle'
import RequireNotAuth from '@/components/utils/RequireNotAuth'
import styles from './page.module.scss'

const page = () => {
	return (
		<RequireNotAuth>
			<div>
				<PrimaryTitle className={styles.title}>
					Registration
				</PrimaryTitle>
				<RegistrationForm />
			</div>
		</RequireNotAuth>
	)
}

export default page
