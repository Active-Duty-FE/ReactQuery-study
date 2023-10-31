import { QueryClient, useQuery } from '@tanstack/react-query'
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { fetchList } from '../../request/fetch-data'
import { useNavigate } from 'react-router-dom'
import FetchingIcon from '../../components/fetching-icon'

interface IProps {
  children?: ReactNode
}

const List: FC<IProps> = memo(() => {
  const navigate = useNavigate()
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list'],
    queryFn: fetchList
  })

  const clickListHandlder = (id: number) => {
    navigate(`/detail/${id}`)
  }
  return (
    <>
      <div>{isFetching ? 'fetchinginner...' : isLoading ? 'isLoading' : ''}</div>
      <>
        {data &&
          data.data &&
          data.data.map((item: any) => (
            <div className="p-6" key={item.id}>
              <h2 className="text-2xl ">{item.title}</h2>
              <div className="border p-2 mt-2 cursor-pointer" onClick={() => clickListHandlder(item.id)}>
                {item.content}
              </div>
            </div>
          ))}
      </>
    </>
  )
})

export default List

List.displayName = 'List'
