'use client'
import { useActions } from '@/hooks/useActions'
import { IUserWithId } from '@/types/user.interface'
import { FC, PropsWithChildren, useEffect } from 'react'

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
	const { login, setIsCheckingAuthFinished } = useActions()

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

	return <div>{children}</div>
}

export default Wrapper
