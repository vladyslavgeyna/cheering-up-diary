import { redirect } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import Loader from '../ui/loader/Loader'

const RequireNotAuth: FC<PropsWithChildren> = ({ children }) => {
	const { isAuthenticated, isLoading, isCheckingAuthFinished } =
		useTypedSelector(state => state.user)

	if (isLoading || !isCheckingAuthFinished) {
		return <Loader text='Loading...' />
	}

	if (isAuthenticated && isCheckingAuthFinished) {
		redirect('/')
	}

	return children
}

export default RequireNotAuth
