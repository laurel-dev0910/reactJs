import { lazy } from 'react'

const LazyLoginPage = lazy(() => import('pages/login'))

const routers = [
  { path: '/', name: 'home', element: <>Home</>, meta: { pageTitle: 'Home' } },
  { path: '/login', name: 'login', element: LazyLoginPage, meta: { pageTitle: 'Home' } }
]

export default routers
