import { EncryptStorage } from 'encrypt-storage';
import { ENCRYPT_LOCALE_STORAGE_KEY } from '@/utils/constants';

export const encryptStorage = new EncryptStorage(ENCRYPT_LOCALE_STORAGE_KEY);
