
import { useState } from "react";
import { Header } from "@/components/Header";
import { QuestionList } from "@/components/QuestionList";
import { UserDashboard } from "@/components/UserDashboard";
import { SignupForm } from "@/components/SignupForm";

const Index = () => {
  const [currentView, setCurrentView] = useState<'questions' | 'profile' | 'signup'>('questions');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('questions');
  };

  // Show signup form if not logged in
  if (!isLoggedIn && currentView !== 'signup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Header 
          currentView={currentView} 
          setCurrentView={setCurrentView}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        
        <main className="container mx-auto px-4 pt-20">
          <SignupForm onSignup={handleLogin} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      
      <main className="container mx-auto px-4 pt-20">
        {currentView === 'questions' && <QuestionList />}
        {currentView === 'profile' && <UserDashboard />}
        {currentView === 'signup' && <SignupForm onSignup={handleLogin} />}
      </main>
    </div>
  );
};

export default Index;
