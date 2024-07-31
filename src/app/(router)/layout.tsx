import React from 'react'
import Header from './_components/Menu/Header'


interface RoutesLayoutProps{
    children:React.ReactNode
}

const RoutesLayout = ({children}:RoutesLayoutProps) => {
  return (
   <div className='flex flex-col h-screen'>
      <Header/>
      <div className='flex-1'>
        {children}
      </div>
   </div>
  )
}

export default RoutesLayout