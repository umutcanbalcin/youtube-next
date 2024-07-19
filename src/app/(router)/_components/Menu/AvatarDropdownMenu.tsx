import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface AvatarDropdownMenuProps {
  userPicture: string | undefined;
  className?: string; // Opsiyonel className prop'u eklendi
}

const AvatarDropdownMenu: React.FC<AvatarDropdownMenuProps> = ({ userPicture, className }) => {
  return (
    <DropdownMenu>
      <div className={`w-48 ${className}`}> {/* className prop'unu burada kullanabilirsiniz */}
        <DropdownMenuItem>
          <Avatar>
            <AvatarImage src={userPicture} />
            <AvatarFallback>UB</AvatarFallback>
          </Avatar>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutLink>
            Oturum Kapat
          </LogoutLink>
        </DropdownMenuItem>
      </div>
    </DropdownMenu>
  );
};

export default AvatarDropdownMenu;
