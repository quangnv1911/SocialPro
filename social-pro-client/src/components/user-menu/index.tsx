import userStore from '@/stores/userStore';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { LogOut, User, Wallet, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, ReactElement } from 'react';
import { PAYMENT_PATH } from '@/utils/constants';

interface UserMenuProps {
  handleLogout: () => void;
}
const UserMenu: FC<UserMenuProps> = ({ handleLogout }: UserMenuProps): ReactElement => {
  const { user } = userStore();
  const router = useRouter();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage src={user?.avatar ?? ''} alt="User" />
            <AvatarFallback>{user?.userName?.charAt(0) ?? 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.userName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Balance display with recharge button */}
        <div className="px-2 py-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center text-sm text-gray-600">
              <Wallet className="h-3.5 w-3.5 mr-1.5" />
              <span>Số dư tài khoản:</span>
            </div>
            <span className="text-sm font-medium">{user?.money?.toLocaleString() ?? 0}đ</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-1 text-xs bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white border-0"
            onClick={() => router.push(PAYMENT_PATH)}
          >
            <PlusCircle className="h-3.5 w-3.5 mr-1.5" /> Nạp tiền ngay
          </Button>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/profile')} className="hover:cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Tài khoản của tôi</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-500 focus:text-red-500 focus:bg-red-50 hover:cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
