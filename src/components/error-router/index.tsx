import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const ErrorRouter: FC<IProps> = memo(() => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn't exist!</div>
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>
    }

    if (error.status === 418) {
      return <div>🫖</div>
    }
  }
  console.log(error)

  return <div>router error</div>
})

export default ErrorRouter

ErrorRouter.displayName = 'ErrorRouter'
