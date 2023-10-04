import PrimaryLink from '@/components/ui/primary-link/PrimaryLink'
import Link from 'next/link'
import Container from '../container/Container'
import styles from './Header.module.scss'

const Header = () => {
	// this is just placeholder
	const isAuthenticated = true

	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<Container>
					<div className={styles.block}>
						<Link className={styles.navlink} href={'/'}>
							Home
						</Link>
						<div className={styles.blockChild}>
							<div className={styles.linksWrapper}>
								{isAuthenticated ? (
									<Link
										className={styles.link}
										href={'/note/create'}>
										<span>Add new note</span>
									</Link>
								) : (
									<PrimaryLink href={'/'}>Log in</PrimaryLink>
								)}
							</div>
						</div>
					</div>
				</Container>
			</nav>
		</header>
	)
}

export default Header
