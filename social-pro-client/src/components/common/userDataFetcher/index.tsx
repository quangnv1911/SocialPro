'use client';

import { useEffect } from 'react';
import { useQuery } from '@/hooks';
import { userQueries } from '@/api/actions/user/user.queries';
import userStore from '@/stores/userStore';
import authStore from '@/stores/authState';

export default function UserDataFetcher() {
  const auth = authStore();
  const isAuthenticated = auth?.isAuthenticated || false;
  const { setCurrentUserData } = userStore();
  const a = 'a';
  // Using the query with useEffect to handle success
  const { data: userData } = useQuery({
    ...userQueries.me(isAuthenticated),
    enabled: !!isAuthenticated, // Only run the query if authenticated
  });

  // Handle the success case with useEffect
  useEffect(() => {
    console.log('userData', userData);
    if (userData) {
      console.log('true');
      setCurrentUserData(userData);
    }
    console.log('false');
  }, [userData, setCurrentUserData]);

  return null; // This component doesn't render anything
}
