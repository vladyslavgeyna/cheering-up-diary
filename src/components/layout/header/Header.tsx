'use client'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useContext } from 'react'
import ReactSwitch from 'react-switch'
import Container from '../container/Container'
import { ThemeContext } from '../wrapper/Wrapper'
import styles from './Header.module.scss'
import './Header.scss'

const Header = () => {
	const currentTheme = useContext(ThemeContext)

	const { isAuthenticated, isCheckingAuthFinished, isLoading, user } =
		useTypedSelector(state => state.user)

	const { logout } = useActions()

	const handleLogout = () => {
		logout()
		redirect('/')
	}

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
								<div className={styles.themeSwitchWrapper}>
									<p>{currentTheme.theme} mode</p>
									<ReactSwitch
										checked={currentTheme.theme === 'dark'}
										onChange={currentTheme?.toggleTheme}
									/>
								</div>
								{isLoading || !isCheckingAuthFinished ? (
									''
								) : isAuthenticated ? (
									<>
										<Link
											className={styles.link}
											href={'/note/create'}>
											<span>Add new note</span>
										</Link>
										<button
											onClick={handleLogout}
											className={styles.link}
											type={'button'}>
											<span>Logout</span>
										</button>
										<p className={styles.greeting}>
											Hello, {user?.username}
										</p>
									</>
								) : (
									<>
										<Link
											className={styles.link}
											href={'/register'}>
											<span>Sign up</span>
										</Link>
										<Link
											className={styles.link}
											href={'/login'}>
											<span>Sign in</span>
										</Link>
									</>
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
