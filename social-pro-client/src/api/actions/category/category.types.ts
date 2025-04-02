import { BigCategory } from '@/utils/constants/bigCategory';

export type CategoryResponse = {
  id: string;
  name: string;
  description: string;
  image: string;
  bigCategory: BigCategory;
};
