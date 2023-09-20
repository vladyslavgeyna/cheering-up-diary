import Link from 'next/link'
import Container from '../container/Container'
import styles from './Footer.module.scss'

const Footer = () => {
	return (
		<Container>
			<footer className={styles.footer}>
				<div className={styles.authorBlock}>
					<Link href='/'>Cheering up diary</Link>
					<span>
						© {new Date().getFullYear()} cheering up diary by{' '}
						<a
							className={styles.authorLink}
							target='_blank'
							href='https://github.com/vladyslavgeyna/cheering-up-diary'>
							IPZ-21-5 TEAM
						</a>
					</span>
				</div>
			</footer>
		</Container>
	)
}

export default Footer
