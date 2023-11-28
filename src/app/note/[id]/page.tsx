'use client'

import Loader from '@/components/ui/loader/Loader'
import RequireAuth from '@/components/utils/RequireAuth'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useGetNoteByIdQuery } from '@/store/api/note'
import { redirect } from 'next/navigation'
import React, { FC } from 'react'

type PropsType = {
    params: {
        id: string
    }
}

const Page: FC<PropsType> = ({params : {id}}) => {
  
    const { user } = useTypedSelector(state => state.user)

    if (!user) {
        redirect('/login')
    }

    const { error, isLoading, data } = useGetNoteByIdQuery(Number(id))

    if (isLoading) {
        return <Loader text='Loading...' />
    }

    if (error) {
        return <h1>Some error occured</h1>
    }

    if(!data) {
        return <h1>Note not found</h1>
    }

    if(data.userId !== user.id) {
        console.log(data.userId)
        console.log(user.id)
        redirect('/')
    }

    return (
    <RequireAuth>
        <div>
            <h1>{data.category}</h1>
        </div>
    </RequireAuth>
  )
}

export default Page