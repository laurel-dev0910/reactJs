import ROUTE from 'constant/route'
import React, { ComponentType, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const access_token = new Cookies(null).get('access_token')
    const onLoginPage = window.location.pathname === ROUTE.LOGIN

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!access_token)

    useEffect(() => {
      setIsAuthenticated(access_token)
    }, [access_token])

    if (isAuthenticated && onLoginPage) return <Navigate to={ROUTE.HOME} />

    if ((!isAuthenticated && onLoginPage) || isAuthenticated) return <WrappedComponent {...props} />

    return <Navigate to={ROUTE.LOGIN} />
  }

  return AuthenticatedComponent
}

export default withAuth
