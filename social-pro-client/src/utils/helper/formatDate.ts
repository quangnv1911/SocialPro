import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy', { locale: vi }); // Định dạng dd/MM/yyyy cho tiếng Việt

};