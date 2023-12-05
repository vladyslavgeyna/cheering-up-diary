'use client'
import { useActions } from '@/hooks/useActions'
import { IUserWithId } from '@/types/user.interface'
import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from 'react'

type ThemeType = 'light' | 'dark'

export const ThemeContext = createContext<{
	theme: ThemeType
	toggleTheme: () => void
}>({ theme: 'light', toggleTheme: () => {} })

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
	const { login, setIsCheckingAuthFinished } = useActions()

	const [theme, setTheme] = useState<ThemeType>('light')

	const toggleTheme = () => {
		setTheme(current => (current === 'light' ? 'dark' : 'light'))
	}

	useEffect(() => {
		const userJSON = localStorage.getItem('user')

		let user = null

		if (userJSON) {
			user = JSON.parse(userJSON) as IUserWithId
		}

		if (user) {
			login(user)
		}

		setIsCheckingAuthFinished(true)
	})

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<div className={`wrapper ${theme}`}>{children}</div>
		</ThemeContext.Provider>
	)
}

export default Wrapper
