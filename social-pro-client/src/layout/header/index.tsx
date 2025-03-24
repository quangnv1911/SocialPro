'use client';
import { Toggle } from '@/components/ui/toggle';
import { Bell, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import profilePic from '@/assets/images/logo.png';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import UserProfileHeader from '@/components/common/header/profile';
import templateStore from '@/stores/templateStore';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const HeaderComponent = () => {
  const { setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#0A1E4B] to-blue-600 shadow-lg">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo Section - Left side */}
        <div className="flex items-center gap-4">
          <Image
            src={profilePic}
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-white font-semibold text-xl">MyApp</h1>
        </div>

        {/* Right Section - Right side */}
        <div className="flex items-center gap-6">

          {/* Dark Mode Toggle */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun
                    className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon
                    className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-white" />
            <span
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
          3
        </span>
          </Button>

          {/* User Profile */}
          <UserProfileHeader />
        </div>
      </div>
    </header>


  );
};

export default HeaderComponent;
