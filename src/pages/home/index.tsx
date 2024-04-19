import Api from 'axios.config'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  const [user, setUser] = useState<any>({})

  const getRevokeFEOCondition = () => {
    const a = 1
    const b = '1'
    const rule1 = a === a
    const rule2 = [a === a, a === a, a === 2]
    return rule1 && rule2.includes(true)
  }

  console.log(getRevokeFEOCondition())
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Api.getWithParams('/auth/profile')
        setUser(data)
      } catch (error) {
        console.error(error)
      }
    }
    // fetchData()
  }, [])

  return (
    <div className='flex flex-col bg-black w-screen h-screen'>
      <h1 className='text-white text-[80px] text-center'>Welcome to Laurel website 🤣🤣🤣!</h1>
      <Link to={'/beo'} className='mx-auto bg-red-200 rounded-lg mt-10'>
        <button className='font-bold text-2xl'>To another page</button>
      </Link>
    </div>
  )
}

export default Homepage
