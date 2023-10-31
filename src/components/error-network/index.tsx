import React, { memo, useCallback, useState } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const ErrorNetwork: FC<IProps> = memo(({ children }) => {
  const [hasError, setHasError] = useState(false)

  const handleOnError = useCallback((error: any) => {
    console.error('An error occurred:', error)
    setHasError(true)
  }, [])

  if (hasError) {
    return <div>error catcher</div>
  }

  return <>{children}</>
})

export default ErrorNetwork

ErrorNetwork.displayName = 'ErrorNetwork'
