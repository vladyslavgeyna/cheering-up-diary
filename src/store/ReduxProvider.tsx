'use client'

import { FC, PropsWithChildren } from 'react'
import { store } from './store'

import { Provider } from 'react-redux'

const ReduxProvider: FC<PropsWithChildren> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
