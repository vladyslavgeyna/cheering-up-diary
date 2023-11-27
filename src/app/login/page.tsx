import LoginFormComponent from '@/components/login-form/login-form'
import PrimaryTitle from '@/components/ui/primary-title/PrimaryTitle'
import RequireNotAuth from '@/components/utils/RequireNotAuth'
import styles from './page.module.scss'

const page = () => {
	return (
		<RequireNotAuth>
			<div>
				<PrimaryTitle className={styles.title}>Sign in</PrimaryTitle>
				<LoginFormComponent />
			</div>
		</RequireNotAuth>
	)
}

export default page
