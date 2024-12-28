
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Redirect to login page
        router.push('/login');
      } else {
        // Handle error (optional)
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="destructive" 
      onClick={handleLogout}
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? (
        <>
          <span className="animate-spin mr-2">🔄</span>
          Logging out...
        </>
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" /> 
          Logout
        </>
      )}
    </Button>
  );
}