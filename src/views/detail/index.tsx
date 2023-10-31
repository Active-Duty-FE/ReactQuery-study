import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { appRequest } from '../../request'
import { List, Response, getDetail, updateDetail } from '../../request/fetch-data'

interface IProps {
  children?: ReactNode
}

const Detail: FC<IProps> = memo(() => {
  const { id } = useParams()
  const { data, error, isFetching, isLoading } = useQuery({
    queryKey: ['detail', 'get', { id }],
    queryFn: () => getDetail(id || '')
  })

  const [title, setTitle] = useState<string>()
  const [content, setContent] = useState<string>()
  useEffect(() => {
    setTitle(data?.data?.title)
    setContent(data?.data?.content)
  }, [data])

  const navigate = useNavigate()
  const titleInputRef = useRef<HTMLInputElement>(null)
  const contentInputRef = useRef<HTMLInputElement>(null)
  const [isEditting, setIsEditting] = useState(false)
  const body = {
    id: id!,
    title: title || '',
    content: content || ''
  }
  const queryClient = useQueryClient()
  const update = useMutation({
    mutationKey: ['detail', 'put', { id }],
    mutationFn: (data: List) => updateDetail(id || '', body),
    async onMutate(newDetail) {
      // 낙관적 업데이트를 덮어쓰지 않기 위해 쿼리를 수동으로 삭제한다.
      await queryClient.cancelQueries(['detail', 'put', { id }])

      // 이전 값
      const previousHeroData = queryClient.getQueryData(['detail', 'get', { id }])
      // 새로운 값으로 낙관적 업데이트 진행
      queryClient.setQueryData(['detail', 'get', { id }], (oldData: any) => {
        return {
          msg: 'old Data',
          data: newDetail
        }
      })
      setIsEditting(false)
      // 값이 들어있는 context 객체를 반환
      return {
        previousHeroData
      }
    },
    // mutation이 실패하면 onMutate에서 반환된 context를 사용하여 롤백 진행
    onError(error, hero, context: any) {
      queryClient.setQueryData(['detail', 'put', { id }], context.previousHeroData)
    },
    // 오류 또는 성공 후에는 항상 리프레쉬
    onSettled() {
      queryClient.invalidateQueries(['detail', 'put', { id }])
    }
  })

  const handleSubmit = async () => {
    const res = update.mutate(body)
  }
  const handleEdit = () => {
    setIsEditting((c) => {
      return true
    })
  }
  useEffect(() => {
    if (isEditting) {
      titleInputRef.current?.focus()
    }
  }, [isEditting])
  return (
    <div className="mt-4">
      <>{isFetching && <div>fetchinginner...</div>}</>
      <>{isLoading && <div>isLoading</div>}</>
      <div>
        {data && data.data ? (
          <>
            {isEditting ? (
              <>
                <div>
                  <input
                    ref={titleInputRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-4 text-2xl text-gray-400"
                  ></input>
                </div>
                <div>
                  <input
                    ref={contentInputRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border p-4 mt-4 w-full text-gray-400"
                    type="text"
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl p-4">{data.data.title}</h2>
                <div className="mt-4 border p-4">{data.data.content}</div>
              </>
            )}
          </>
        ) : !data ? (
          <div></div>
        ) : (
          <div>没有数据</div>
        )}
      </div>
      {!isEditting ? (
        <button className="px-4 py-2 bg-red-400 mt-3 rounded-xl text-white hover:bg-red-600" onClick={handleEdit}>
          修改
        </button>
      ) : (
        <button className="px-4 py-2 bg-sky-400 mt-3 rounded-xl text-white hover:bg-sky-600" onClick={handleSubmit}>
          提交
        </button>
      )}
      <button
        className="px-4 py-2 bg-indigo-400 mt-3 rounded-xl text-white hover:bg-indigo-600 ml-4"
        onClick={() => navigate(-1)}
      >
        后退
      </button>
    </div>
  )
})

export default Detail

Detail.displayName = 'Detail'
