import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Maximize, Moon, Settings, Sun } from 'lucide-react';
import themeStore from '@/stores/themeState';

const HeaderComponent = () => {
  const { setTheme, theme } = themeStore();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 to-black text-white shadow-md">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <h2 className="text-xl font-semibold tracking-wide">Social Pro Dashboard</h2>
          </Link>
        </div>

        {/* Control buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-800 p-2 rounded-full transition"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <Sun className="h-6 w-6 text-white dark:hidden" />
            <Moon className="h-6 w-6 text-white hidden dark:block" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-800 p-2 rounded-full transition"
            onClick={() => toggleFullscreen()}
          >
            <Maximize className="h-6 w-6 text-white" />
          </Button>

          <Button variant="ghost" size="icon" className="hover:bg-gray-800 p-2 rounded-full transition">
            <Settings className="h-6 w-6 text-white" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
