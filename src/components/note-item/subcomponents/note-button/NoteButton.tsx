import React from 'react'
import styles from './NoteButton.module.scss'

interface ButtonProps {
	color: 'red' | 'blue' | 'green'
	onClick: () => void
	children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ color, onClick, children }) => {
	return (
		<button
			className={`${styles.button} ${styles[color]}`}
			onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
