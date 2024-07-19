import { Button } from '@/components/ui/button'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs'
import { User } from 'lucide-react'
import React from 'react'

const LoginButton = () => {
  return (
    <LoginLink>
            <Button variant="outline" size={'lg'} className='rounded-xl'>
            <User/> Oturum Aç
            </Button>
    </LoginLink>
  )
}

export default LoginButton