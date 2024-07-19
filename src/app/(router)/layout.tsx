import React from 'react'
import Header from './_components/Menu/Header'


interface RoutesLayoutProps{
    children:React.ReactNode
}

const RoutesLayout = ({children}:RoutesLayoutProps) => {
  return (
   <>
   <Header/>
   <div >
    {children}
   </div>
   </>
  )
}

export default RoutesLayout