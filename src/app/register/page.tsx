import RegistrationForm from '@/components/registration-form/RegistrationForm'
import PrimaryTitle from '@/components/ui/primary-title/PrimaryTitle'
import styles from './page.module.scss'

const page = () => {
	return (
		<div>
			<PrimaryTitle className={styles.title}>Registration</PrimaryTitle>
			<RegistrationForm />
		</div>
	)
}

export default page
