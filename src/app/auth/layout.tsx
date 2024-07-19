import React from 'react'


interface AuthLayoutProps{
    children:React.ReactNode
}

const AuthLayout = ({children}:AuthLayoutProps) => {
  return (
   <>
   <div className='min-h-screen h-screen  flex bg-gray-200 items-center justify-center'>
    <div className='w-4/5 h-3/5 bg-white rounded-3xl container' >
        {children}
    </div>
   
   </div>
   </>
  )
}

export default AuthLayout