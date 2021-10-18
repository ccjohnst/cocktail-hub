import React, { useRef, useEffect } from 'react'

// Variable
const isBrowser = typeof window !== 'undefined'

// Initialise useIsMount
let useIsMount

// Conditionally set useIsMount depending on if rendered on node or in browser.
if (isBrowser !== 'undefined') {
  // Custom hook to indicate whether current render is first render

  useIsMount = () => {
    const isMountRef = useRef(true)
    useEffect(() => {
      isMountRef.current = false
    }, [])
    return isMountRef.current
  }
}

export default useIsMount
