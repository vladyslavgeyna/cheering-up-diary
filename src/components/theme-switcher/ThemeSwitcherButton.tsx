import React, { useEffect, useState } from 'react'
import styles from './ThemeToggleButton.module.scss'

const ThemeSwitcherButton: React.FC = () => {
	const [isDarkTheme, setIsDarkTheme] = useState(() => {
		return localStorage.getItem('darkTheme') === 'true'
	})

	useEffect(() => {
		localStorage.setItem('darkTheme', isDarkTheme.toString())
	}, [isDarkTheme])

	const toggleTheme = () => {
		const wrapper = document.querySelector('.wrapper')
		if (wrapper) {
			wrapper.classList.toggle('dark-theme', !isDarkTheme)
			wrapper.classList.toggle('light-theme', isDarkTheme)
			setIsDarkTheme(!isDarkTheme)
		}
	}

	return (
		<button onClick={toggleTheme} className={styles.themeToggleButton}>
			{isDarkTheme ? 'Світла тема' : 'Темна тема'}
		</button>
	)
}

export default ThemeSwitcherButton
