'use client'
import { EncryptStorage } from 'encrypt-storage';
import { ENCRYPT_LOCALE_STORAGE_KEY } from '@/utils/constants';
import { StateStorage } from 'zustand/middleware/persist';

export const encryptStorage = (): EncryptStorage | null => {
  const isInClientSide =
    typeof window !== 'undefined' && typeof window?.self !== 'undefined';
console.log(isInClientSide)
  if (isInClientSide) {
    return new EncryptStorage(ENCRYPT_LOCALE_STORAGE_KEY);
  }

  return null;
};
export const setItemAsync = (data: string) => encryptStorage()?.encryptValue(JSON.stringify(data));
export const getItemAsync = (data: string) => JSON.parse(<string>encryptStorage()?.decryptValue(data));

export const SecureStorage: StateStorage = {
  getItem: async (data: string): Promise<string | null> => JSON.parse(<string>encryptStorage()?.decryptValue(data)),
  setItem: async (data: string) => encryptStorage()?.encryptValue(JSON.stringify(data)),
  removeItem: async (data: string) => encryptStorage()?.removeItem(data),
};