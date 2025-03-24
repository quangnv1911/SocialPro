'use client';
import { FC, ReactElement } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import authStore from '@/stores/authState';
import LoginModal from '@/components/features/login';
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SanitizedHTML from '@/components/common/sanitizeText';
import { useMutation } from '@/hooks';
import { LoginMutationResponse, LogoutMutationRequest } from '@/api/actions/auth/auth.types';
import { toast } from 'react-toastify';
import { StandardizedApiError } from '@/context/apiClient/apiClientContextController/apiError/apiError.types';

const UserProfileHeader: FC = (): ReactElement => {
  const { isAuthenticated, userName, clearTokens, accessToken } = authStore();

  const { mutateAsync: logout, isPending: isLogout } = useMutation('logoutMutation', {
    onSuccess: () => {
      toast.success('Đăng nhập thành công');
      clearTokens();
    },
    onError: (error: StandardizedApiError) => {
      toast.error(error.message);
    },
  });
  const handleLogout: () => Promise<void> = async () => {
    await logout({ accessToken } as LogoutMutationRequest);
  };
  return (
    <div className="flex items-center gap-2">
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <SanitizedHTML htmlContent={userName || ''} className={'text-white'} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => console.log('Navigate to profile')}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => console.log('Navigate to settings')}
            >
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleLogout()}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <LoginModal />
      )}
    </div>
  );
};

export default UserProfileHeader;
