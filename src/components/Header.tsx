
import { Button } from "@/components/ui/button";
import { User, Code, Trophy, LogOut } from "lucide-react";

interface HeaderProps {
  currentView: 'questions' | 'profile' | 'signup';
  setCurrentView: (view: 'questions' | 'profile' | 'signup') => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (logged: boolean) => void;
}

export const Header = ({ currentView, setCurrentView, isLoggedIn, setIsLoggedIn }: HeaderProps) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('questions');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
              <Code className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CodePrep
            </h1>
          </div>

          <nav className="flex items-center space-x-4">
            <Button
              variant={currentView === 'questions' ? 'default' : 'ghost'}
              onClick={() => setCurrentView('questions')}
              className="flex items-center space-x-2"
            >
              <Code className="h-4 w-4" />
              <span>Questions</span>
            </Button>

            {isLoggedIn ? (
              <>
                <Button
                  variant={currentView === 'profile' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('profile')}
                  className="flex items-center space-x-2"
                >
                  <Trophy className="h-4 w-4" />
                  <span>Dashboard</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <Button
                variant={currentView === 'signup' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('signup')}
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Sign Up</span>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
