import LoginFormComponent from '@/components/login-form/login-form'
import PrimaryTitle from '@/components/ui/primary-title/PrimaryTitle'
import styles from './page.module.scss'

const page = () => {
	return (
		<div>
			<PrimaryTitle className={styles.title}>Sign in</PrimaryTitle>
			<LoginFormComponent />
		</div>
	)
}

export default page
