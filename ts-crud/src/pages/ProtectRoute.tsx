import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Route Protector
export function ProtectRoute(): void {
  const navigate = useNavigate();
 
  // useEffect function which checks if there is an Auth and if it has a truthy value, if it does, proceeds with Redirecting.
  useEffect(() => {
    const Auth = sessionStorage.getItem('Auth');

    if (!Auth) {
      // Redirects back to login page if Auth is false/falsy.
      navigate('/');
    }
  }, []);
}