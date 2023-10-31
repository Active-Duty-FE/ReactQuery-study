import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const FetchingIcon: FC<IProps> = memo(() => {
  return <div className="fixed right-0 top-0">fetchingoutside</div>
})

export default FetchingIcon

FetchingIcon.displayName = 'FetchingIcon'
