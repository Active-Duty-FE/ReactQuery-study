import { RouteObject, createBrowserRouter } from 'react-router-dom'
import List from '../views/list'
import Detail from '../views/detail'
import App, { queryClient } from '../App'
import ErrorRouter from '../components/error-router'
import Main from '../views/main'

export const routes = [
  {
    path: '/',
    element: <Main />
  },
  {
    path: '/list',
    element: <List />
  },
  {
    path: '/detail/:id',
    element: <Detail />
  }
]
