import Link from 'next/link'
import Container from '../container/Container'
import styles from './Header.module.scss'

const Header = () => {
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
								<Link
									className={styles.link}
									href={'/note/create'}>
									<span>Add new note</span>
								</Link>
							</div>
						</div>
					</div>
				</Container>
			</nav>
		</header>
	)
}

export default Header
