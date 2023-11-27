import RegistrationFormComponent from '@/components/registration-form/registration-form'
import PrimaryTitle from '@/components/ui/primary-title/PrimaryTitle'
import styles from './page.module.scss'

const page = () => {
	return (
		<div>
			<PrimaryTitle className={styles.title}>Registration</PrimaryTitle>
			<RegistrationFormComponent />
		</div>
	)
}

export default page
