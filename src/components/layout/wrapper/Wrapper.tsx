'use client'
import { useActions } from '@/hooks/useActions'
import { IUser } from '@/types/user.interface'
import { FC, PropsWithChildren, useEffect } from 'react'

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
	const { login, setIsCheckingAuthFinished } = useActions()

	useEffect(() => {
		const userJSON = localStorage.getItem('user')

		let user = null

		if (userJSON) {
			user = JSON.parse(userJSON) as IUser
		}

		if (user) {
			login(user)
		}

		setIsCheckingAuthFinished(true)
	})

	return <div className='wrapper'>{children}</div>
}

export default Wrapper
