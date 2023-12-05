'use client'
import { FC, PropsWithChildren, createContext, useState } from 'react'

type ThemeType = 'light' | 'dark'

export const ThemeContext = createContext<{
	theme: ThemeType
	toggleTheme: () => void
}>({ theme: 'light', toggleTheme: () => {} })

const ThemeWrapper: FC<PropsWithChildren> = ({ children }) => {
	const [theme, setTheme] = useState<ThemeType>(
		(localStorage.getItem('theme') as ThemeType) || 'light',
	)

	const toggleTheme = () => {
		setTheme(current => {
			const themeToSet = current === 'light' ? 'dark' : 'light'
			localStorage.setItem('theme', themeToSet)
			return themeToSet
		})
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<div className={`wrapper ${theme}`}>{children}</div>
		</ThemeContext.Provider>
	)
}

export default ThemeWrapper
