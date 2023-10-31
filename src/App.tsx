import React, { Suspense } from 'react'
import Sidebar from './components/sidebar'
import { Outlet, useRoutes } from 'react-router-dom'
import { QueryClient, QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { ErrorBoundary } from 'react-error-boundary'
import FetchingIcon from './components/fetching-icon'
import { routes } from './router'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      suspense: true,
      useErrorBoundary: true
    }
  }
})
const persister = createSyncStoragePersister({
  storage: window.localStorage
})
function App() {
  const { reset } = useQueryErrorResetBoundary()
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          There was an error!
          <button className="bg-red-400 rounded-md ml-4" onClick={() => resetErrorBoundary()}>
            Try again
          </button>
        </div>
      )}
    >
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        {/* <QueryClientProvider client={queryClient}> */}
        <div className="App">
          <div className="flex">
            <Sidebar></Sidebar>
            <Suspense fallback={<div>fetchingoutside</div>}>
              <div>{useRoutes(routes)}</div>
            </Suspense>
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
        {/* </QueryClientProvider> */}
      </PersistQueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
