import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import ROUTE from './constant/route'
import { Suspense, lazy, useEffect } from 'react'
import AuthGuard from 'router/AuthGuard'
import Homepage from 'pages/home'
import Cookies from 'universal-cookie'
import Api from 'axios.config'
import Beo from 'pages/beo'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false
    }
  }
})

const LazyLoginPage = lazy(() => import('./pages/login'))

const App = () => {
  // const cookies = new Cookies(null)

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     // Test token expires by remove access token
  //     cookies.remove('access_token')

  //     const fetchData = async () => {
  //       try {
  //         const { data } = await Api.getWithParams('/auth/profile')
  //         console.log(data)
  //       } catch (error) {
  //         console.error(error)
  //       }
  //     }
  //     fetchData()
  //     fetchData()
  //   }, 5000)
  //   return () => {
  //     clearTimeout(timer)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<></>}>
            <Routes>
              {/* Normal routes */}
              <Route path={ROUTE.LOGIN} element={<LazyLoginPage />} />
              {/* Auth routes */}
              <Route element={<AuthGuard />}>
                <Route path={'/beo'} element={<Beo />} />
                <Route path={'/'} element={<Homepage />} />
              </Route>
              {/* No matched route */}
              <Route path='*' element={<div>No route</div>} />
            </Routes>
          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
}

export default App
