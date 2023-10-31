import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Main: FC<IProps> = memo(() => {
  return <div>main</div>
})

export default Main

Main.displayName = 'Main'
