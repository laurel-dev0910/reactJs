import Api from 'axios.config'
import { useLayoutEffect } from 'react'
import Cookies from 'universal-cookie'

const Login = () => {
  const cookies = new Cookies(null, { path: '/' })

  useLayoutEffect(() => {
    if (cookies.get('access_token')) window.location.pathname = '/'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (cookies.get('access_token')) return <></>

  const handleLogin = async () => {
    try {
      const { data } = await Api.post('/auth/login', {
        email: 'john@mail.com',
        password: 'changeme'
      })
      cookies.set('access_token', data?.access_token || '')
      cookies.set('refresh_token', data?.refresh_token || '')
      window.location.pathname = '/'
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <div>
        <p className='mb-10 font-medium text-sm'>Log into my account</p>
        <button
          onClick={handleLogin}
          className='h-[42px] bg-clr-gray cursor-pointer rounded-lg px-[55px] gap-x-[50px] items-center font-medium text-black flex justify-between'
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
