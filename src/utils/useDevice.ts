import { useEffect, useState } from 'react'

const useDevice = () => {
  const [isDesktop, setIsDesktop] = useState(true)
  const [isMobile, setIsMobile] = useState(true)
  const [isTablet, setIsTablet] = useState(true)

  useEffect(() => {
    const updateState = function () {
      const initIsDesktop = window?.innerWidth >= 1180
      const initIsTablet = window?.innerWidth < 1024
      const initIsMobile = window?.innerWidth >= 768

      setIsDesktop(initIsDesktop)
      setIsTablet(initIsTablet)
      setIsMobile(initIsMobile)
    }
    window.addEventListener('resize', updateState)
    return () => window.removeEventListener('resize', updateState)
  }, [])
  return { isDesktop, isMobile, isTablet }
}

export default useDevice
