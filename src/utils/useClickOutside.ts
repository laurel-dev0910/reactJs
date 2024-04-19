import { useEffect } from 'react'

const useClickOutside = (ref: A, callback: A) => {
  const handleClick = (e: A) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback?.()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

export default useClickOutside
