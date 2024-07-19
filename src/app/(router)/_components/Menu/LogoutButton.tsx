
import { Button } from '@/components/ui/button';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'; 
import { LogOut } from 'lucide-react';


const CustomLogoutButton = () => {
  

  return (
    <LogoutLink>
      <Button variant="outline" size={'lg'} className='rounded-xl'>
        <LogOut/> Çıkış Yap
      </Button>
    </LogoutLink>
  );
};

export default CustomLogoutButton;
