import { Link } from 'react-router-dom'

const Beo = () => {
  return (
    <div className='flex flex-col bg-black w-screen h-screen'>
      <h1 className='text-white text-[80px] text-center'>Chang béo 🤣🤣🤣</h1>
      <Link to={'/'} className='mx-auto bg-blue-200 rounded-lg mt-10'>
        <button className='font-bold text-2xl'>To Home page</button>
      </Link>
    </div>
  )
}

export default Beo
