import withAuth from 'hoc/withAuthentication'
import React from 'react'
import { Outlet} from 'react-router-dom'

const AuthGuard = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}

export default withAuth(AuthGuard)
