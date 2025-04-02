'use client';

import { useEffect } from 'react';
import { useQuery } from '@/hooks';
import { userQueries } from '@/api/actions/user/user.queries';
import userStore from '@/stores/userStore';
import authStore from '@/stores/authState';

export default function UserDataFetcher() {
  const { isAuthenticated } = authStore();
  const { setCurrentUserData } = userStore();

  // Using the query with useEffect to handle success
  const { data: userData } = useQuery(userQueries.me(isAuthenticated));

  // Handle the success case with useEffect
  useEffect(() => {
    if (userData) {
      setCurrentUserData(userData);
    }
  }, [userData, setCurrentUserData]);

  return null; // This component doesn't render anything
}
