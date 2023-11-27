import LoginForm from '@/components/login-form/LoginForm'
import PrimaryTitle from '@/components/ui/primary-title/PrimaryTitle'
import RequireNotAuth from '@/components/utils/RequireNotAuth'
import styles from './page.module.scss'

const page = () => {
	return (
		<RequireNotAuth>
			<div>
				<PrimaryTitle className={styles.title}>Sign in</PrimaryTitle>
				<LoginForm />
			</div>
		</RequireNotAuth>
	)
}

export default page
